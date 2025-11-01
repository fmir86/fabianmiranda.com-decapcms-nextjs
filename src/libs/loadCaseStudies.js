import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export function loadCaseStudies() {
  const caseStudiesDirectory = path.join(process.cwd(), 'content/case-studies');

  // Check if directory exists
  if (!fs.existsSync(caseStudiesDirectory)) {
    return [];
  }

  const filenames = fs.readdirSync(caseStudiesDirectory);

  const caseStudies = filenames
    .filter(filename => filename.endsWith('.md'))
    .map((filename) => {
      const filePath = path.join(caseStudiesDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);

      const caseStudy = {
        slug: filename.replace(/\.md$/, ''),
        title: data.title,
        description: data.description,
        image: data.image,
        tags: data.tags || [],
        highlights: data.highlights || [],
        impact: data.impact,
        featured: data.featured || false,
        order: data.order || 999
      };

      // Only include URLs if they exist (avoid undefined)
      if (data.live_url) {
        caseStudy.liveUrl = data.live_url;
      }
      if (data.github_url) {
        caseStudy.githubUrl = data.github_url;
      }

      return caseStudy;
    })
    // Sort by order field
    .sort((a, b) => a.order - b.order);

  return caseStudies;
}
