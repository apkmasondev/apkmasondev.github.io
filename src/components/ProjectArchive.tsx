import { useMemo, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { copy } from '../content';
import {
  archiveProjects,
  featuredProjects,
  projects,
  type Language,
  type ProjectCategory,
} from '../data/projects';
import { SectionIndexNote } from './SectionIndexNote';

type Filter = 'all' | ProjectCategory;

export function ProjectArchive({ language }: { language: Language }) {
  const [filter, setFilter] = useState<Filter>('all');
  const text = copy[language].archive;
  const filters: Filter[] = ['all', 'story', 'spatial', 'app', 'experiment', 'product'];

  const visibleProjects = useMemo(
    () => filter === 'all' ? archiveProjects : archiveProjects.filter((project) => project.category === filter),
    [filter],
  );

  return (
    <section className="archive section-shell" id="archive" aria-labelledby="archive-title">
      <header className="section-heading section-heading--split">
        <div>
          <p className="eyebrow">{text.overline} / {String(projects.length).padStart(2, '0')}</p>
          <h2 id="archive-title">
            {text.titleLead}
            <span className="accent-word">{text.titleAccent}</span>
          </h2>
        </div>
        <SectionIndexNote
          index={`${String(featuredProjects.length + 1).padStart(2, '0')}—${String(projects.length).padStart(2, '0')}`}
        >
          {text.body}
        </SectionIndexNote>
      </header>

      <div
        className="filter-bar"
        role="group"
        aria-label={language === 'pl' ? 'Filtry projektów' : 'Project filters'}
      >
        {filters.map((item) => {
          const count = item === 'all'
            ? archiveProjects.length
            : archiveProjects.filter((project) => project.category === item).length;
          return (
            <button
              type="button"
              className={filter === item ? 'is-active' : ''}
              aria-pressed={filter === item}
              onClick={() => setFilter(item)}
              key={item}
            >
              {text.filters[item]} <span>{String(count).padStart(2, '0')}</span>
            </button>
          );
        })}
      </div>

      <div className="archive-grid">
        {visibleProjects.map((project) => {
          const collectionNumber = featuredProjects.length + archiveProjects.indexOf(project) + 1;

          return (
            <article className="archive-card" key={project.id}>
              <a href={project.link} target="_blank" rel="noreferrer" aria-label={`${text.open}: ${project.title}`}>
                <div className="archive-image">
                  <img src={project.image} alt="" loading="lazy" decoding="async" />
                  <span className="archive-arrow"><ArrowUpRight aria-hidden="true" /></span>
                </div>
                <div className="archive-copy">
                  <div className="archive-meta">
                    <span>{project.category}</span>
                    <i aria-hidden="true" />
                    <span>{project.tags.slice(0, 2).join(' / ')}</span>
                  </div>
                  <div className="archive-title-row">
                    <span className="archive-card-index" aria-hidden="true">
                      {String(collectionNumber).padStart(2, '0')}
                    </span>
                    <h3>{project.title}</h3>
                  </div>
                  <div className="archive-description">
                    <span aria-hidden="true" />
                    <p>{project.description[language]}</p>
                  </div>
                </div>
              </a>
            </article>
          );
        })}
      </div>
    </section>
  );
}
