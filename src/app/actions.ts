"use server";

import { revalidatePath } from "next/cache";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { prisma } from "@/lib/db";
import { verifyPassword, setAdminSession, clearAdminSession, getAdminSession } from "@/lib/auth";

// Helper to extract message from unknown catch errors
function getErrorMessage(error: unknown, fallback = "An error occurred."): string {
  if (error instanceof Error) return error.message;
  return fallback;
}

// --- FILE UPLOAD HELPER ---
async function saveUploadedFile(file: File, subfolder: string): Promise<string> {
  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Target directory: public/uploads/subfolder
    const uploadDir = join(process.cwd(), "public", "uploads", subfolder);
    await mkdir(uploadDir, { recursive: true });
    
    const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    const filePath = join(uploadDir, safeName);
    
    await writeFile(filePath, buffer);
    return `/uploads/${subfolder}/${safeName}`;
  } catch (error) {
    console.error("File upload error:", error);
    throw new Error("Failed to save uploaded file.");
  }
}

// --- PUBLIC SERVER ACTIONS ---

// Submit new admission application
export async function submitAdmissionAction(formData: FormData) {
  try {
    const studentName = formData.get("studentName") as string;
    const dateOfBirth = formData.get("dateOfBirth") as string;
    const gender = formData.get("gender") as string;
    const gradeApplied = formData.get("gradeApplied") as string;
    const academicYear = formData.get("academicYear") as string;
    const parentName = formData.get("parentName") as string;
    const parentEmail = formData.get("parentEmail") as string;
    const parentPhone = formData.get("parentPhone") as string;
    const address = formData.get("address") as string;
    
    // File uploads
    const documentFiles = formData.getAll("documents") as File[];
    const uploadedDocs: { name: string; url: string }[] = [];

    for (const file of documentFiles) {
      if (file && file.size > 0) {
        const url = await saveUploadedFile(file, "admissions");
        uploadedDocs.push({ name: file.name, url });
      }
    }

    // Generate Unique Application Number
    const count = await prisma.admission.count();
    const applicationNumber = `GHS-2026-${1000 + count + 1}`;

    const newApplication = await prisma.admission.create({
      data: {
        applicationNumber,
        studentName,
        dateOfBirth,
        gender,
        gradeApplied,
        academicYear,
        parentName,
        parentEmail,
        parentPhone,
        address,
        documents: JSON.stringify(uploadedDocs),
        status: "PENDING",
      },
    });

    return {
      success: true,
      applicationNumber: newApplication.applicationNumber,
      message: "Application submitted successfully!",
    };
  } catch (error) {
    console.error("Submit admission action error:", error);
    return { success: false, message: getErrorMessage(error, "Failed to submit application.") };
  }
}

// Track application status
export async function getAdmissionStatusAction(applicationNumber: string) {
  try {
    const application = await prisma.admission.findUnique({
      where: { applicationNumber: applicationNumber.trim() },
      select: {
        applicationNumber: true,
        studentName: true,
        gradeApplied: true,
        academicYear: true,
        status: true,
        createdAt: true,
      },
    });

    if (!application) {
      return { success: false, message: "Application number not found." };
    }

    return { success: true, application };
  } catch (error) {
    console.error("Track admission error:", error);
    return { success: false, message: "An error occurred while tracking application." };
  }
}

// Submit contact/enquiry form
export async function submitEnquiryAction(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    await prisma.enquiry.create({
      data: {
        name,
        email,
        phone,
        subject,
        message,
      },
    });

    revalidatePath("/admin/dashboard/enquiries");
    return { success: true, message: "Enquiry submitted successfully. We will get back to you shortly!" };
  } catch (error) {
    console.error("Submit enquiry error:", error);
    return { success: false, message: "Failed to submit enquiry." };
  }
}

// --- ADMIN AUTH ACTIONS ---

export async function adminLoginAction(formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      return { success: false, message: "Email and password are required." };
    }

    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin) {
      return { success: false, message: "Invalid credentials." };
    }

    const isMatch = await verifyPassword(password, admin.password);
    if (!isMatch) {
      return { success: false, message: "Invalid credentials." };
    }

    // Set cookie session
    await setAdminSession({
      id: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
    });

    return { success: true, message: "Login successful!" };
  } catch (error) {
    console.error("Admin login error:", error);
    return { success: false, message: "An error occurred during login." };
  }
}

export async function adminLogoutAction() {
  await clearAdminSession();
  return { success: true };
}

// --- SECURE ADMIN DASHBOARD CRUD ACTIONS ---

// Helper to check authentication in server actions
async function requireAuth() {
  const session = await getAdminSession();
  if (!session) {
    throw new Error("Unauthorized access. Please log in.");
  }
  return session;
}

// Update application status (Approve / Reject)
export async function updateAdmissionStatusAction(id: string, status: string) {
  try {
    await requireAuth();
    await prisma.admission.update({
      where: { id },
      data: { status },
    });
    revalidatePath("/admin/dashboard/admissions");
    return { success: true, message: `Application status updated to ${status}.` };
  } catch (error) {
    return { success: false, message: getErrorMessage(error) };
  }
}

// Faculty Management
export async function addFacultyAction(formData: FormData) {
  try {
    await requireAuth();
    const name = formData.get("name") as string;
    const designation = formData.get("designation") as string;
    const qualification = formData.get("qualification") as string;
    const experience = formData.get("experience") as string;
    const department = formData.get("department") as string;
    const orderStr = formData.get("displayOrder") as string;
    const displayOrder = parseInt(orderStr || "0", 10);
    
    const imageFile = formData.get("image") as File;
    let imageUrl = "/images/logo.png"; // default

    if (imageFile && imageFile.size > 0) {
      imageUrl = await saveUploadedFile(imageFile, "faculty");
    }

    await prisma.faculty.create({
      data: { name, designation, qualification, experience, department, imageUrl, displayOrder },
    });

    revalidatePath("/");
    revalidatePath("/admin/dashboard/faculty");
    return { success: true, message: "Faculty member added successfully!" };
  } catch (error) {
    return { success: false, message: getErrorMessage(error) };
  }
}

export async function deleteFacultyAction(id: string) {
  try {
    await requireAuth();
    await prisma.faculty.delete({ where: { id } });
    revalidatePath("/");
    revalidatePath("/admin/dashboard/faculty");
    return { success: true, message: "Faculty member deleted." };
  } catch (error) {
    return { success: false, message: getErrorMessage(error) };
  }
}

// Gallery Management
export async function addGalleryItemAction(formData: FormData) {
  try {
    await requireAuth();
    const title = formData.get("title") as string;
    const category = formData.get("category") as string;
    const imageFile = formData.get("image") as File;

    if (!imageFile || imageFile.size === 0) {
      return { success: false, message: "An image file is required." };
    }

    const imageUrl = await saveUploadedFile(imageFile, "gallery");

    await prisma.galleryItem.create({
      data: { title, category, imageUrl },
    });

    revalidatePath("/");
    revalidatePath("/admin/dashboard/gallery");
    return { success: true, message: "Gallery image uploaded successfully!" };
  } catch (error) {
    return { success: false, message: getErrorMessage(error) };
  }
}

export async function deleteGalleryItemAction(id: string) {
  try {
    await requireAuth();
    await prisma.galleryItem.delete({ where: { id } });
    revalidatePath("/");
    revalidatePath("/admin/dashboard/gallery");
    return { success: true, message: "Gallery image deleted." };
  } catch (error) {
    return { success: false, message: getErrorMessage(error) };
  }
}

// News Management
export async function addNewsAction(formData: FormData) {
  try {
    await requireAuth();
    const title = formData.get("title") as string;
    const summary = formData.get("summary") as string;
    const content = formData.get("content") as string;
    const isFeatured = formData.get("isFeatured") === "true";
    
    const imageFile = formData.get("image") as File;
    let imageUrl = "/images/building.jpg"; // default

    if (imageFile && imageFile.size > 0) {
      imageUrl = await saveUploadedFile(imageFile, "news");
    }

    await prisma.news.create({
      data: { title, summary, content, imageUrl, isFeatured, status: "PUBLISHED" },
    });

    revalidatePath("/");
    revalidatePath("/admin/dashboard/news");
    return { success: true, message: "News article published successfully!" };
  } catch (error) {
    return { success: false, message: getErrorMessage(error) };
  }
}

export async function deleteNewsAction(id: string) {
  try {
    await requireAuth();
    await prisma.news.delete({ where: { id } });
    revalidatePath("/");
    revalidatePath("/admin/dashboard/news");
    return { success: true, message: "News article deleted." };
  } catch (error) {
    return { success: false, message: getErrorMessage(error) };
  }
}

// Event Management
export async function addEventAction(formData: FormData) {
  try {
    await requireAuth();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const date = formData.get("date") as string;
    const location = formData.get("location") as string;

    await prisma.event.create({
      data: { title, description, date, location, registrationCount: 0, status: "UPCOMING" },
    });

    revalidatePath("/");
    revalidatePath("/admin/dashboard/events");
    return { success: true, message: "School event scheduled successfully!" };
  } catch (error) {
    return { success: false, message: getErrorMessage(error) };
  }
}

export async function deleteEventAction(id: string) {
  try {
    await requireAuth();
    await prisma.event.delete({ where: { id } });
    revalidatePath("/");
    revalidatePath("/admin/dashboard/events");
    return { success: true, message: "Event cancelled/deleted." };
  } catch (error) {
    return { success: false, message: getErrorMessage(error) };
  }
}

// Enquiry Read State Toggle
export async function markEnquiryReadAction(id: string, isRead: boolean) {
  try {
    await requireAuth();
    await prisma.enquiry.update({
      where: { id },
      data: { isRead },
    });
    revalidatePath("/admin/dashboard/enquiries");
    return { success: true, message: `Enquiry marked as ${isRead ? "read" : "unread"}.` };
  } catch (error) {
    return { success: false, message: getErrorMessage(error) };
  }
}

// Content and SEO Settings update
export async function updateContentSettingAction(key: string, value: string) {
  try {
    await requireAuth();
    await prisma.contentSetting.upsert({
      where: { key },
      update: { value },
      create: { key, value, description: `Dynamic content value for ${key}` },
    });
    
    revalidatePath("/");
    revalidatePath("/admin/dashboard/content");
    revalidatePath("/admin/dashboard/seo");
    return { success: true, message: "Site settings updated successfully!" };
  } catch (error) {
    return { success: false, message: getErrorMessage(error) };
  }
}
