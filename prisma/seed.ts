import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Hash the default admin password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('GouthamAdmin2026!', salt);

  // 1. Seed Admins
  const admin = await prisma.admin.upsert({
    where: { email: 'admin@gouthamschool.com' },
    update: {},
    create: {
      email: 'admin@gouthamschool.com',
      password: hashedPassword,
      name: 'School Administrator',
      role: 'SUPER_ADMIN',
    },
  });
  console.log('Seeded Admin: ', admin.email);

  // 2. Seed Faculty
  await prisma.faculty.deleteMany();
  const facultyMembers = [
    {
      name: 'N.Lakshmi Narayana',
      designation: 'Principal',
      qualification: 'Ph.D in Education, M.Sc (Physics)',
      experience: '22 Years',
      department: 'Administration',
      imageUrl: '/images/logo.png',
      displayOrder: 1,
    },
    {
      name: 'Mr. Rajesh Kumar',
      designation: 'Head of Science',
      qualification: 'M.Sc (Chemistry), B.Ed',
      experience: '14 Years',
      department: 'Science',
      imageUrl: '/images/building.png',
      displayOrder: 2,
    },
    {
      name: 'Mrs. Anjali Sharma',
      designation: 'Senior Math Teacher',
      qualification: 'M.Sc (Mathematics), M.Ed',
      experience: '10 Years',
      department: 'Mathematics',
      imageUrl: '/images/logo.png',
      displayOrder: 3,
    },
    {
      name: 'Mr. David Paul',
      designation: 'Physical Education Director',
      qualification: 'M.P.Ed',
      experience: '8 Years',
      department: 'Sports',
      imageUrl: '/images/building.png',
      displayOrder: 4,
    },
  ];
  for (const f of facultyMembers) {
    await prisma.faculty.create({ data: f });
  }
  console.log('Seeded Faculty Members.');

  // 3. Seed Gallery
  await prisma.galleryItem.deleteMany();
  const galleryItems = [
    {
      title: 'Independence Day Celebrations',
      category: 'EVENTS',
      imageUrl: '/images/logo.png',
    },
    {
      title: 'Morning Prayer Session',
      category: 'CAMPUS',
      imageUrl: '/images/logo.png',
    },
    {
      title: 'School Front Building',
      category: 'CAMPUS',
      imageUrl: '/images/building.png',
    },
    {
      title: 'Science Laboratory Experiment',
      category: 'LABS',
      imageUrl: '/images/building.png',
    },
  ];
  for (const g of galleryItems) {
    await prisma.galleryItem.create({ data: g });
  }
  console.log('Seeded Gallery Items.');

  // 4. Seed News
  await prisma.news.deleteMany();
  const newsItems = [
    {
      title: 'Admissions Open for Academic Year 2026-27',
      summary: 'Applications are now open for Nursery to Class X. Schedule a campus tour today.',
      content: 'Goutham E.M High School is pleased to announce that registrations for the upcoming academic session 2026-27 have officially commenced. We invite parents seeking a holistic, technology-driven education for their children to apply online or visit our school admissions desk. Special focus on slow learners and AI tools.',
      imageUrl: '/images/building.png',
      isFeatured: true,
      status: 'PUBLISHED',
    },
    {
      title: '100% Success in CBSE Board Examinations',
      summary: 'Goutham E.M High School achieves stellar academic results with all students passing in high distinction.',
      content: 'We are incredibly proud to share that our secondary Class 10 students have once again achieved 100% pass results in the Board Examinations. Over 90% of our students scored top marks aggregate, highlighting the dedication of our experienced faculty and the hard work of our learners.',
      imageUrl: '/images/building.png',
      isFeatured: false,
      status: 'PUBLISHED',
    },
  ];
  for (const n of newsItems) {
    await prisma.news.create({ data: n });
  }
  console.log('Seeded News.');

  // 5. Seed Events
  await prisma.event.deleteMany();
  const events = [
    {
      title: 'Annual Science & Tech Fair',
      description: 'Interact with student-designed smart city models and AI tools projects.',
      date: '2026-07-15',
      location: 'Main School Assembly Hall',
      registrationCount: 154,
      status: 'UPCOMING',
    },
    {
      title: 'Parent-Teacher Consultations',
      description: 'Discuss individual student progress, behavioral growth, and special focus on slow learners.',
      date: '2026-06-28',
      location: 'Respective Classrooms',
      registrationCount: 320,
      status: 'UPCOMING',
    },
  ];
  for (const e of events) {
    await prisma.event.create({ data: e });
  }
  console.log('Seeded Events.');

  // 6. Seed Admissions
  await prisma.admission.deleteMany();
  const mockAdmissions = [
    {
      applicationNumber: 'GHS-2026-1001',
      studentName: 'Aarav Patil',
      dateOfBirth: '2015-08-14',
      gender: 'Male',
      gradeApplied: 'Class V',
      academicYear: '2026-2027',
      parentName: 'Rajesh Patil',
      parentEmail: 'rajesh.patil@example.com',
      parentPhone: '9490923166',
      address: 'Neerugattuvari Palle, Madanapalle, Andhra Pradesh',
      documents: JSON.stringify([{ name: 'BirthCertificate.pdf', url: '#' }]),
      status: 'PENDING',
    },
    {
      applicationNumber: 'GHS-2026-1002',
      studentName: 'Meera Deshmukh',
      dateOfBirth: '2012-03-22',
      gender: 'Female',
      gradeApplied: 'Class VIII',
      academicYear: '2026-2027',
      parentName: 'Sunita Deshmukh',
      parentEmail: 'sunita.d@example.com',
      parentPhone: '9490923166',
      address: 'Near IIT Talent School, Madanapalle, Andhra Pradesh',
      documents: JSON.stringify([{ name: 'TransferCertificate.pdf', url: '#' }, { name: 'ReportCard.pdf', url: '#' }]),
      status: 'APPROVED',
    },
  ];
  for (const a of mockAdmissions) {
    await prisma.admission.create({ data: a });
  }
  console.log('Seeded Admissions.');

  // 7. Seed Enquiries
  await prisma.enquiry.deleteMany();
  const mockEnquiries = [
    {
      name: 'Karthik Rao',
      email: 'karthik.rao@example.com',
      phone: '9490923166',
      subject: 'Inquiry regarding school bus routes',
      message: 'Hello, we live in Madanapalle and wanted to ask if school bus transportation is available for our area, and what the pickup times are. Thank you.',
      isRead: false,
    },
    {
      name: 'Pooja Hegde',
      email: 'pooja.hegde@example.com',
      phone: '9490923166',
      subject: 'Sports activities and training programs',
      message: 'Hi, does the school offer professional coaching in Kabaddi and Kho-Kho? Thanks.',
      isRead: true,
    },
  ];
  for (const eq of mockEnquiries) {
    await prisma.enquiry.create({ data: eq });
  }
  console.log('Seeded Enquiries.');

  // 8. Seed ContentSettings
  await prisma.contentSetting.deleteMany();
  const settings = [
    {
      key: 'homepage.hero',
      value: JSON.stringify({
        headline: 'Goutham E.M High School | IIT Talent School',
        subheadline: 'Admissions Open for Academic Year 2026–27',
      }),
      description: 'Homepage Hero section content settings.',
    },
    {
      key: 'homepage.stats',
      value: JSON.stringify({
        studentsCount: '5000+',
        facultyCount: '150+',
        yearsExcellence: '25+',
        development: '100%',
      }),
      description: 'Homepage statistics metric values.',
    },
    {
      key: 'seo.globals',
      value: JSON.stringify({
        title: 'Goutham E.M High School | IIT Talent School',
        description: 'Goutham E.M High School is a premier educational institution in Madanapalle providing excellence in academics, sports, and holistic development.',
        keywords: 'Goutham E.M High School, IIT Talent School, Madanapalle, admissions open 2026, quality education',
      }),
      description: 'Global search engine optimization settings.',
    },
  ];
  for (const s of settings) {
    await prisma.contentSetting.create({ data: s });
  }
  console.log('Seeded Content Settings.');

  console.log('Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
