'use client';

import { motion } from 'framer-motion';
import { projects, getProjectsByTier } from '@/content/projects';
import { Github, ExternalLink, Linkedin, Mail, Download, ArrowRight, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function Home() {
  const flagshipProjects = getProjectsByTier('flagship');
  const featuredProjects = getProjectsByTier('featured');
  const funProjects = getProjectsByTier('fun');
  const courseworkProjects = getProjectsByTier('coursework');

  const [showCoursework, setShowCoursework] = useState(false);

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="min-h-screen flex flex-col justify-center px-8 py-32 relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-bg-elevated backdrop-blur-sm border border-border px-3.5 py-1.5 rounded-full text-xs text-text-secondary mb-6 w-fit"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
          Available for new opportunities
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tight mb-6"
        >
          I build products at the<br />
          <span className="gradient-text">intersection of business<br />& engineering</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg text-text-secondary max-w-xl leading-relaxed mb-8 font-light"
        >
          Senior Business Analyst & Product Owner with 5+ years bridging strategy and code.
          From fintech at FIS Global to ERP at Gemba Concepts — I ship data-driven solutions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex gap-4 items-center mb-16"
        >
          <a href="#projects" className="btn-primary">
            Explore Projects
            <ArrowRight className="w-4 h-4" />
          </a>
          <a href="/rishabh-resume.pdf" className="btn-secondary" download>
            <Download className="w-4 h-4" />
            Resume
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex gap-12 pt-8 border-t border-border"
        >
          <div>
            <span className="font-display text-3xl font-bold gradient-text">5+</span>
            <p className="text-xs text-text-muted uppercase tracking-wider mt-1">Years Experience</p>
          </div>
          <div>
            <span className="font-display text-3xl font-bold gradient-text">20+</span>
            <p className="text-xs text-text-muted uppercase tracking-wider mt-1">Projects Shipped</p>
          </div>
          <div>
            <span className="font-display text-3xl font-bold gradient-text">3</span>
            <p className="text-xs text-text-muted uppercase tracking-wider mt-1">Certifications</p>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-8 flex items-center gap-2 text-text-muted"
        >
          <ChevronDown className="w-4 h-4 animate-bounce" />
          <span className="font-mono text-xs uppercase tracking-widest">Scroll</span>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          ABOUT SECTION
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-8 py-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-[11px] text-accent uppercase tracking-[3px] mb-3">01 — About</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-8">
            From fintech to ERP to AI
          </h2>
          <div className="grid md:grid-cols-2 gap-12 text-text-secondary leading-relaxed">
            <p>
              I started my career at <strong className="text-text-primary">FIS Global</strong>, where I wore multiple hats —
              from Business Analyst to Product Owner — working on Accounts Receivable systems in the fintech space.
              I learned how enterprise software is built, how microservices scale, and how to translate business
              requirements into technical specifications.
            </p>
            <p>
              Today at <strong className="text-text-primary">Gemba Concepts</strong>, I lead ERP product strategy for
              garment manufacturing, bridging the gap between factory-floor operations and cloud-native software.
              I don't just write specs — I prototype in Python, analyze data with Power BI, and understand the
              codebase deeply enough to review PRs.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          EXPERIENCE TIMELINE
      ═══════════════════════════════════════════════════════════════════ */}
      <section id="experience" className="max-w-7xl mx-auto px-8 py-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-[11px] text-accent uppercase tracking-[3px] mb-3">02 — Experience</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-12">
            Where I've worked
          </h2>

          <div className="space-y-0">
            <div className="timeline-item">
              <p className="font-mono text-xs text-text-muted mb-2">2022 — Present</p>
              <h3 className="font-display text-2xl font-semibold mb-2">
                Senior Business Analyst & Product Owner
              </h3>
              <p className="text-accent font-medium mb-3">Gemba Concepts Pvt. Ltd.</p>
              <p className="text-text-secondary leading-relaxed mb-4 max-w-2xl">
                Leading ERP product strategy for garment manufacturing. Managing cross-functional teams,
                defining product roadmaps, and bridging the gap between factory operations and software engineering.
                Hands-on with SQL, Python, Power BI, and cloud deployments.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="tag">Product Strategy</span>
                <span className="tag">ERP</span>
                <span className="tag">SQL</span>
                <span className="tag">Power BI</span>
                <span className="tag">Python</span>
                <span className="tag">Agile / SAFe</span>
              </div>
            </div>

            <div className="timeline-item">
              <p className="font-mono text-xs text-text-muted mb-2">2019 — 2022</p>
              <h3 className="font-display text-2xl font-semibold mb-2">
                Product Owner / Business Analyst
              </h3>
              <p className="text-accent font-medium mb-3">FIS Global</p>
              <p className="text-text-secondary leading-relaxed mb-4 max-w-2xl">
                Worked on Accounts Receivable systems in the fintech domain. Evolved from BA to PO,
                managing backlogs, sprint planning, and stakeholder communication. Gained deep expertise
                in Spring Boot microservices architecture and enterprise Java systems.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="tag">Fintech</span>
                <span className="tag">Java</span>
                <span className="tag">Spring Boot</span>
                <span className="tag">Microservices</span>
                <span className="tag">JIRA</span>
                <span className="tag">Confluence</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SKILLS SECTION
      ═══════════════════════════════════════════════════════════════════ */}
      <section id="skills" className="max-w-7xl mx-auto px-8 py-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-[11px] text-accent uppercase tracking-[3px] mb-3">03 — Skills</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-12">
            What I work with
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="skill-group">
              <h3 className="skill-title">Product & Analysis</h3>
              <div className="skill-tags">
                <span className="skill-tag">Product Management</span>
                <span className="skill-tag">Business Analysis</span>
                <span className="skill-tag">User Stories</span>
                <span className="skill-tag">JIRA</span>
                <span className="skill-tag">Confluence</span>
                <span className="skill-tag">SAFe 5</span>
                <span className="skill-tag">Agile / Scrum</span>
                <span className="skill-tag">Stakeholder Mgmt</span>
              </div>
            </div>

            <div className="skill-group">
              <h3 className="skill-title">Data & Analytics</h3>
              <div className="skill-tags">
                <span className="skill-tag">SQL (Oracle, MS SQL)</span>
                <span className="skill-tag">Python (Pandas, NumPy)</span>
                <span className="skill-tag">Power BI</span>
                <span className="skill-tag">DAX</span>
                <span className="skill-tag">Excel</span>
                <span className="skill-tag">Data Modeling</span>
                <span className="skill-tag">ETL</span>
              </div>
            </div>

            <div className="skill-group">
              <h3 className="skill-title">Backend</h3>
              <div className="skill-tags">
                <span className="skill-tag">Java</span>
                <span className="skill-tag">Spring Boot</span>
                <span className="skill-tag">Spring MVC</span>
                <span className="skill-tag">Spring Cloud</span>
                <span className="skill-tag">Microservices</span>
                <span className="skill-tag">REST APIs</span>
                <span className="skill-tag">Eureka</span>
                <span className="skill-tag">Zuul</span>
              </div>
            </div>

            <div className="skill-group">
              <h3 className="skill-title">Frontend</h3>
              <div className="skill-tags">
                <span className="skill-tag">React</span>
                <span className="skill-tag">JavaScript</span>
                <span className="skill-tag">TypeScript</span>
                <span className="skill-tag">HTML / CSS</span>
                <span className="skill-tag">Tailwind CSS</span>
                <span className="skill-tag">Bootstrap</span>
                <span className="skill-tag">Next.js</span>
              </div>
            </div>

            <div className="skill-group">
              <h3 className="skill-title">Cloud & DevOps</h3>
              <div className="skill-tags">
                <span className="skill-tag">AWS (Textract, S3)</span>
                <span className="skill-tag">Docker</span>
                <span className="skill-tag">GitHub Actions</span>
                <span className="skill-tag">CI/CD</span>
                <span className="skill-tag">Git</span>
              </div>
            </div>

            <div className="skill-group">
              <h3 className="skill-title">AI & Emerging</h3>
              <div className="skill-tags">
                <span className="skill-tag">OpenAI API</span>
                <span className="skill-tag">Whisper</span>
                <span className="skill-tag">FastAPI</span>
                <span className="skill-tag">Computer Vision</span>
                <span className="skill-tag">AWS Textract</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          FLAGSHIP PROJECTS
      ═══════════════════════════════════════════════════════════════════ */}
      <section id="projects" className="max-w-7xl mx-auto px-8 pt-24 pb-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-end mb-12"
        >
          <div>
            <p className="font-mono text-[11px] text-accent uppercase tracking-[3px] mb-3">04 — Flagship</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
              Flagship Projects
            </h2>
            <p className="text-sm text-text-muted mt-2">Deep-dive case studies of my most impactful work</p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {flagshipProjects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="project-card"
            >
              <div
                className="card-image flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${
                    ['#1e1b4b, #312e81', '#0c4a6e, #164e63', '#14532d, #064e3b', '#4c1d95, #581c87'][i % 4]
                  })`,
                }}
              >
                <span className="card-image-icon">{project.title.charAt(0)}</span>
              </div>
              <div className="card-body">
                <div className="card-tier">Flagship</div>
                <h3 className="card-title">{project.title}</h3>
                <p className="card-desc">{project.description}</p>
                <div className="card-tags">
                  {project.stack.map((tech) => (
                    <span key={tech} className="tag">{tech}</span>
                  ))}
                </div>
                <div className="card-badges">
                  {project.isPrivate ? (
                    <span className="badge badge-private">🔒 Case Study</span>
                  ) : (
                    <>
                      {project.liveUrl && (
                        <a href={project.liveUrl} className="badge badge-live">● Live</a>
                      )}
                      {project.github && (
                        <a href={project.github} className="badge badge-code" target="_blank" rel="noopener noreferrer">
                          Code <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          FEATURED PROJECTS
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-8 pt-16 pb-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-end mb-12"
        >
          <div>
            <p className="font-mono text-[11px] text-accent uppercase tracking-[3px] mb-3">05 — Featured</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
              Featured Projects
            </h2>
            <p className="text-sm text-text-muted mt-2">A selection of projects across different domains</p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredProjects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="project-card"
            >
              <div
                className="card-image flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${
                    ['#1a1a2e, #16213e', '#0f3460, #533483', '#1b4332, #2d6a4f',
                     '#1e3a5f, #4a1942', '#2c3e50, #34495e', '#0d1b2a, #1b2838',
                     '#1a1a2e, #0f3460', '#2d1b69, #11998e', '#3c1642, #0f3460'][i % 9]
                  })`,
                }}
              >
                <span className="card-image-icon">{project.title.charAt(0)}</span>
              </div>
              <div className="card-body">
                <div className="card-tier">Featured</div>
                <h3 className="card-title">{project.title}</h3>
                <p className="card-desc">{project.description}</p>
                <div className="card-tags">
                  {project.stack.slice(0, 4).map((tech) => (
                    <span key={tech} className="tag">{tech}</span>
                  ))}
                </div>
                <div className="card-badges">
                  {project.isPrivate ? (
                    <span className="badge badge-private">🔒 Private</span>
                  ) : (
                    <>
                      {project.status === 'live' && project.github && (
                        <a href={project.github} className="badge badge-live" target="_blank" rel="noopener noreferrer">
                          ● Live
                        </a>
                      )}
                      {project.github && (
                        <a href={project.github} className="badge badge-code" target="_blank" rel="noopener noreferrer">
                          Code <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          FUN BUILDS
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-8 pt-16 pb-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="font-mono text-[11px] text-accent uppercase tracking-[3px] mb-3">06 — Fun Builds</p>
          <h2 className="font-display text-3xl font-bold tracking-tight">
            Side Projects & Games
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {funProjects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card p-5"
            >
              <h3 className="font-display font-semibold mb-2">{project.title}</h3>
              <p className="text-sm text-text-secondary mb-3">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {project.stack.map((tech) => (
                  <span key={tech} className="tag">{tech}</span>
                ))}
              </div>
              {project.github && (
                <a href={project.github} className="text-xs text-accent hover:text-accent-secondary transition-colors inline-flex items-center gap-1" target="_blank" rel="noopener noreferrer">
                  View Code <ArrowRight className="w-3 h-3" />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          COURSEWORK ARCHIVE (Collapsible)
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-8 pt-16 pb-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <button
            onClick={() => setShowCoursework(!showCoursework)}
            className="flex items-center gap-4 mb-8 w-full text-left"
          >
            <div>
              <p className="font-mono text-[11px] text-accent uppercase tracking-[3px] mb-3">07 — Archive</p>
              <h2 className="font-display text-3xl font-bold tracking-tight">
                Coursework & Labs
              </h2>
              <p className="text-sm text-text-muted mt-1">{courseworkProjects.length} learning projects across 5 tracks</p>
            </div>
            <ChevronDown className={`w-6 h-6 text-text-muted transition-transform ml-auto ${showCoursework ? 'rotate-180' : ''}`} />
          </button>

          {showCoursework && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              {['Python for Data Science', 'Java / OOP / DSA', 'Backend', 'Frontend', 'Data & Analytics'].map((track) => {
                const trackProjects = courseworkProjects.filter((p) => p.category === track);
                if (trackProjects.length === 0) return null;
                return (
                  <div key={track}>
                    <h3 className="font-display font-semibold text-lg mb-4 text-text-secondary">{track}</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {trackProjects.map((project) => (
                        <a
                          key={project.id}
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="glass-card p-4 hover:border-border-glow transition-all block"
                        >
                          <h4 className="font-medium text-sm mb-1">{project.title}</h4>
                          <p className="text-xs text-text-muted mb-2">{project.description}</p>
                          <div className="flex flex-wrap gap-1.5">
                            {project.stack.slice(0, 3).map((tech) => (
                              <span key={tech} className="text-[10px] text-text-muted bg-zinc-800/30 px-2 py-0.5 rounded">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          CERTIFICATIONS
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-8 py-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-[11px] text-accent uppercase tracking-[3px] mb-3">08 — Certifications</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-12">
            Credentials
          </h2>

          <div className="grid md:grid-cols-3 gap-5">
            <div className="glass-card p-6 text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="font-display font-semibold mb-2">SAFe 5 Product Owner / Product Manager</h3>
              <p className="text-xs text-text-muted">Scaled Agile Framework</p>
            </div>
            <div className="glass-card p-6 text-center">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="font-display font-semibold mb-2">Google Data Analytics Professional</h3>
              <p className="text-xs text-text-muted">Google / Coursera</p>
            </div>
            <div className="glass-card p-6 text-center">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="font-display font-semibold mb-2">Google Project Management Professional</h3>
              <p className="text-xs text-text-muted">Google / Coursera</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          CONTACT SECTION
      ═══════════════════════════════════════════════════════════════════ */}
      <section id="contact" className="max-w-7xl mx-auto px-8 py-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="font-mono text-[11px] text-accent uppercase tracking-[3px] mb-3">09 — Contact</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Let's build something<br />
            <span className="gradient-text">great together</span>
          </h2>
          <p className="text-text-secondary max-w-md mx-auto mb-10">
            Whether you have a project in mind, a question about my work, or just want to say hello —
            I'd love to hear from you.
          </p>

          <form
            action="https://formspree.io/f/YOUR_FORM_ID"
            method="POST"
            className="max-w-md mx-auto space-y-4 mb-12"
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className="w-full bg-bg-elevated backdrop-blur-sm border border-border rounded-sm px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-border-glow transition-colors"
            />
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              required
              className="w-full bg-bg-elevated backdrop-blur-sm border border-border rounded-sm px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-border-glow transition-colors"
            />
            <textarea
              name="message"
              placeholder="Your message..."
              rows={4}
              required
              className="w-full bg-bg-elevated backdrop-blur-sm border border-border rounded-sm px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-border-glow transition-colors resize-none"
            />
            <button type="submit" className="btn-primary w-full justify-center">
              Send Message
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="flex justify-center gap-6">
            <a
              href="https://github.com/rishabhkrr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-text-primary transition-colors"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="mailto:rishabhkumar@example.com"
              className="text-text-muted hover:text-text-primary transition-colors"
            >
              <Mail className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="text-text-muted hover:text-text-primary transition-colors"
            >
              <Linkedin className="w-6 h-6" />
            </a>
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════════════════════════════ */}
      <footer className="max-w-7xl mx-auto px-8 py-8 border-t border-border relative z-10">
        <div className="flex justify-between items-center">
          <p className="text-xs text-text-muted">
            © 2026 Rishabh Kumar. Built with Next.js & Framer Motion.
          </p>
          <p className="text-xs text-text-muted">
            Bangalore, India
          </p>
        </div>
      </footer>
    </>
  );
}
