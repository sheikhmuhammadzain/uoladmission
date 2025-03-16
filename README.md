# University of Lahore Admission Assistant

A comprehensive AI-powered admission assistant for the University of Lahore, built with Next.js, PostgreSQL, and Gemini AI.

## Features

- 🤖 AI-powered chatbot for admission inquiries using RAG (Retrieval-Augmented Generation)
- 📚 Secure authentication with NextAuth.js for personalized access
- 📝 Document management for university information
- 🔍 Vector search with pgvector for semantic similarity
- 📱 Responsive UI with Tailwind CSS and shadcn/ui
- 📷 OCR document processing to extract academic information from transcripts
- 🎓 AI-powered degree recommendation system based on academic background and interests
- 📊 Automatic eligibility and scholarship assessment
- 📄 Automated generation of application forms, admission letters, and eligibility reports

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with pgvector extension
- **ORM**: Prisma
- **Authentication**: NextAuth.js
- **AI**: Google Gemini AI
- **Vector Embeddings**: OpenAI Embeddings
- **OCR**: Tesseract.js
- **PDF Generation**: jsPDF

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL 14+ with pgvector extension
- OpenAI API key (for embeddings)
- Google Gemini API key

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/uol-admission-assistant.git
cd uol-admission-assistant
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

Create a `.env.local` file with the following variables:

```
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/uoladmission?schema=public"

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key-change-this-in-production

# OpenAI for embeddings
OPENAI_API_KEY=your-openai-api-key

# Google Gemini
GOOGLE_GEMINI_API_KEY=your-gemini-api-key
```

4. Set up the database:

```bash
# Install pgvector extension in PostgreSQL
# Then run:
npm run setup-db
```

5. Start the development server:

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Admin Access

To access the admin dashboard, use the following credentials:

- Email: admin@uol.edu.pk
- Password: password

### Adding Documents

1. Log in as an admin
2. Navigate to `/admin/documents`
3. Add documents with relevant information about the university, programs, admission policies, etc.

### Using the Chatbot

The chatbot is available on the homepage. Users can ask questions about:

- Admission requirements
- Programs and degrees
- Scholarships
- Campus facilities
- Application process
- And more!

### Document Processing with OCR

The system can extract academic information from uploaded transcripts and certificates using OCR technology:

1. Upload a document (image or PDF)
2. The system will extract text and structured data
3. The extracted data will be used for degree recommendations and eligibility assessment

### Degree Recommendations

Based on the student's academic background and interests, the system will recommend suitable degree programs:

1. The system analyzes the extracted academic data
2. It matches the student's profile with available programs
3. It provides personalized recommendations with match scores

### Eligibility and Scholarship Assessment

The system automatically calculates admission eligibility and scholarship opportunities:

1. It checks if the student meets the minimum CGPA requirement
2. It verifies if the student has the required subjects
3. It determines scholarship eligibility based on academic performance
4. It generates a detailed eligibility report

### Report Generation

The system can generate various reports:

1. Application forms with pre-filled student information
2. Admission letters for eligible students
3. Eligibility assessment reports with recommendations

## MacBook Scroll Component

The homepage includes a MacBook scroll component that displays a screenshot of the admission dashboard. To make this component work properly:

1. Create an image file named `admission-dashboard.webp` in the `public` directory
2. The image should be a screenshot of your actual admission dashboard UI
3. For best results, use a high-resolution image with a 16:10 aspect ratio (typical MacBook screen)

If you don't have a dashboard image yet, you can use a placeholder image temporarily, but remember to replace it with your actual dashboard UI once it's ready.

### Checking Component Setup

You can run the following command to check if all the necessary components are installed correctly:

```bash
npm run check-components
```

This will verify:
- If the MacbookScroll component exists
- If the MacbookScrollDemo component exists
- If the required dependencies (motion, @tabler/icons-react) are installed
- If the dashboard image exists (optional)

### Customizing the MacBook Scroll Component

You can customize the MacBook scroll component by editing the `components/macbook-scroll-demo.tsx` file. You can change:

- The title text
- The badge (university logo)
- The dashboard image
- The gradient effect

### Implementation Details

The MacBook scroll component consists of the following files:

1. `components/ui/macbook-scroll.tsx` - The core component that renders the MacBook with scroll animations
2. `components/macbook-scroll-demo.tsx` - A wrapper component that configures the MacBook scroll for the homepage
3. `public/admission-dashboard.webp` - The dashboard image to be displayed in the MacBook (you need to create this)

The component uses the following dependencies:
- `motion` - For scroll-based animations
- `@tabler/icons-react` - For icons used in the MacBook UI

## License

This project is licensed under the MIT License - see the LICENSE file for details. 