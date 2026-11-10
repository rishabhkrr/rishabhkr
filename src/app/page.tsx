import { publicFile } from '@/lib/assets';
import { Hero } from '@/components/home/Hero';
import { ProofBar } from '@/components/home/ProofBar';
import { DomainsStrip } from '@/components/home/DomainsStrip';
import { Services } from '@/components/home/Services';
import { SelectedWork } from '@/components/home/SelectedWork';
import { Experience } from '@/components/home/Experience';
import { About } from '@/components/home/About';
import { HowIWork } from '@/components/home/HowIWork';
import { Artefacts } from '@/components/home/Artefacts';
import { MoreProjects } from '@/components/home/MoreProjects';
import { Skills } from '@/components/home/Skills';
import { Credentials } from '@/components/home/Credentials';
import { Testimonials } from '@/components/home/Testimonials';
import { Faq } from '@/components/home/Faq';
import { Contact } from '@/components/home/Contact';

export default function HomePage() {
  const resume = publicFile('resume.pdf');
  return (
    <>
      <Hero resumeHref={resume} />
      <ProofBar />
      <DomainsStrip />
      <Services />
      <SelectedWork />
      <Experience />
      <About />
      <HowIWork />
      <Artefacts />
      <MoreProjects />
      <Skills />
      <Credentials />
      <Testimonials />
      <Faq />
      <Contact resumeHref={resume} />
    </>
  );
}
