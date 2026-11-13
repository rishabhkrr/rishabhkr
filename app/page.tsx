import fs from 'node:fs';
import path from 'node:path';
import { links } from '@/content/site';
import { asset } from '@/lib/contact';
import { Hero } from '@/components/sections/hero';
import { Impact } from '@/components/sections/impact';
import { About } from '@/components/sections/about';
import { Experience } from '@/components/sections/experience';
import { Projects } from '@/components/sections/projects';
import { Certifications, Skills } from '@/components/sections/skills';
import { Contact, Footer, Insights } from '@/components/sections/contact';

const publicFile = (p: string) => fs.existsSync(path.join(process.cwd(), 'public', p));

export default function Home() {
  // Resolved at build time: drop files into /public and they appear automatically.
  const hasResume = publicFile(links.resumePath.replace(/^\//, ''));
  const portrait = ['profile.webp', 'profile.jpg', 'profile.png'].find(publicFile);

  return (
    <>
      <Hero hasResume={hasResume} />
      <Impact />
      <About portrait={portrait ? asset(`/${portrait}`) : undefined} />
      <Experience />
      <Projects />
      <Skills />
      <Certifications />
      <Insights />
      <Contact hasResume={hasResume} />
      <Footer />
    </>
  );
}
