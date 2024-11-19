# URExpert - Medical Chart Analysis Tool

URExpert is a professional medical chart analysis tool designed for healthcare providers. It automates patient chart review, provides status recommendations, and assists with InterQual assessments.

## Features

- Automated patient chart analysis
- Real-time status recommendations
- InterQual subset determination
- HIPAA-compliant report generation
- Editable and downloadable reports
- Clean, modern user interface

## Tech Stack

- Next.js 13 with App Router
- TypeScript
- Tailwind CSS
- OpenRouter AI API (Llama 3.2 90B Vision)

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/kameleyon/urexpertv0.git
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your OpenRouter API key:
```env
NEXT_PUBLIC_OPENROUTER_API_KEY=your_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

- `NEXT_PUBLIC_OPENROUTER_API_KEY`: Your OpenRouter API key for AI model access

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
