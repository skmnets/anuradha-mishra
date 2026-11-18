/**
 * Academic Website - Anuradha Mishra
 * Interactive features: Dark/Light Mode, Search & Filter Publications,
 * BibTeX Modal & Copy to Clipboard, Scrollspy, Mobile Drawer.
 */

// Theme Management
const themeToggleBtn = document.getElementById('theme-toggle');
const themeToggleMobile = document.getElementById('theme-toggle-mobile');
const htmlEl = document.documentElement;

function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    if (savedTheme === 'dark') {
      htmlEl.classList.add('dark');
    } else {
      htmlEl.classList.remove('dark');
    }
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    htmlEl.classList.add('dark');
  }
}

function toggleTheme() {
  if (htmlEl.classList.contains('dark')) {
    htmlEl.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  } else {
    htmlEl.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }
}

if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);
if (themeToggleMobile) themeToggleMobile.addEventListener('click', toggleTheme);
initTheme();

// Mobile Navigation Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  // Close mobile menu on clicking any navigation link
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });
}

// BibTeX Data Store
const bibtexRecords = {
  weaver1993: `@article{georges1993weaver,
  title     = {Microsatellite mapping of the gene causing weaver disease in cattle will allow the study of an associated quantitative trait locus},
  author    = {Georges, Michel and Dietz, A. B. and Mishra, Anuradha and Nielsen, D. and Sargeant, L. S. and Sorensen, A. and Steele, M. R. and Zhao, X. and Leipold, H. and Womack, J. E.},
  journal   = {Proceedings of the National Academy of Sciences of the United States of America},
  volume    = {90},
  number    = {3},
  pages     = {1058--1062},
  year      = {1993},
  publisher = {National Academy of Sciences},
  doi       = {10.1073/pnas.90.3.1058},
  pmid      = {8430089},
  note      = {OMIA Landmark Publication (OMIA 001047-9913)}
}`,
  horns1993: `@article{georges1993horns,
  title     = {Microsatellite mapping of a gene affecting horn development in Bos taurus},
  author    = {Georges, Michel and Drinkwater, R. and King, T. and Mishra, Anuradha and Moore, S. S. and Nielsen, D. and Sargeant, L. S. and Sorensen, A. and Steele, M. R. and Zhao, X. and Womack, J. E. and Hetzel, J.},
  journal   = {Nature Genetics},
  volume    = {4},
  number    = {2},
  pages     = {206--210},
  year      = {1993},
  publisher = {Nature Publishing Group},
  doi       = {10.1038/ng0693-206},
  pmid      = {8348160},
  note      = {OMIA Landmark Publication (OMIA 000483-9913)}
}`,
  milk1995: `@article{georges1995milk,
  title     = {Mapping quantitative trait loci controlling milk production in dairy cattle by exploiting progeny testing},
  author    = {Georges, Michel and Nielsen, D. and Mackinnon, M. and Mishra, Anuradha and Okimoto, R. and Pasquino, A. T. and Sargeant, L. S. and Sorensen, A. and Steele, M. R. and Zhao, X. and Womack, J. E. and Hoeschele, I.},
  journal   = {Genetics},
  volume    = {139},
  number    = {2},
  pages     = {907--920},
  year      = {1995},
  publisher = {Genetics Society of America},
  doi       = {10.1093/genetics/139.2.907},
  pmid      = {7713444},
  note      = {Foundational large-scale study of 1,518 sires and 150,000+ daughter production records}
}`,
  granddaughter1994: `@article{georges1994granddaughter,
  title     = {Using a complete microsatellite map and the grand-daughter design to locate polygenes controlling milk production},
  author    = {Georges, Michel and Nielsen, D. and Mackinnon, M. and Mishra, Anuradha and Okimoto, R. and Pasquino, A. T. and Sargeant, L. S. and Sorensen, A. and Steele, M. R. and Zhao, X.},
  journal   = {Animal Biotechnology},
  volume    = {5},
  number    = {2},
  pages     = {219--224},
  year      = {1994},
  publisher = {Taylor & Francis},
  doi       = {10.1080/10495399409525828}
}`,
  vntr1991: `@article{georges1991vntr,
  title     = {Characterization of a set of variable number of tandem repeat markers conserved in Bovidae},
  author    = {Georges, Michel and Gunawardana, A. and Threadgill, D. W. and Lathrop, M. and Olsaker, I. and Mishra, Anuradha and Sargeant, L. L. and Schoeberlein, A. and Steele, M. R. and Terry, C. and others},
  journal   = {Genomics},
  volume    = {11},
  number    = {1},
  pages     = {24--32},
  year      = {1991},
  publisher = {Elsevier},
  doi       = {10.1016/0888-7543(91)90099-Y},
  pmid      = {1684496}
}`,
  progress1990: `@inproceedings{georges1990progress,
  title     = {Progress towards a primary DNA marker in cattle},
  author    = {Georges, Michel and Mishra, Anuradha and Sargeant, L. and Steele, M. and Zhao, X.},
  booktitle = {Proceedings of the 4th World Congress on Genetics Applied to Livestock Production},
  volume    = {13},
  pages     = {109--112},
  year      = {1990},
  address   = {Edinburgh, Scotland}
}`
};

// Toast notification function
function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'fixed bottom-5 right-5 z-50 bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 px-5 py-3 rounded-lg shadow-xl text-sm font-medium transition-all duration-300 opacity-0 pointer-events-none transform translate-y-2';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-2');
  toast.classList.add('opacity-100', 'translate-y-0');
  setTimeout(() => {
    toast.classList.remove('opacity-100', 'translate-y-0');
    toast.classList.add('opacity-0', 'pointer-events-none', 'translate-y-2');
  }, 2600);
}

// BibTeX Modal Controls
const bibtexModal = document.getElementById('bibtex-modal');
const bibtexModalContent = document.getElementById('bibtex-modal-content');
const bibtexModalClose = document.getElementById('bibtex-modal-close');
const bibtexModalCopy = document.getElementById('bibtex-modal-copy');
let activeBibtexKey = '';

function openBibtexModal(key) {
  activeBibtexKey = key;
  const citationText = bibtexRecords[key] || '';
  if (bibtexModalContent) {
    bibtexModalContent.textContent = citationText;
  }
  if (bibtexModal) {
    bibtexModal.classList.remove('hidden');
    bibtexModal.classList.add('flex');
  }
}

function closeBibtexModal() {
  if (bibtexModal) {
    bibtexModal.classList.add('hidden');
    bibtexModal.classList.remove('flex');
  }
}

if (bibtexModalClose) {
  bibtexModalClose.addEventListener('click', closeBibtexModal);
}

if (bibtexModal) {
  bibtexModal.addEventListener('click', (e) => {
    if (e.target === bibtexModal) closeBibtexModal();
  });
}

if (bibtexModalCopy) {
  bibtexModalCopy.addEventListener('click', () => {
    if (bibtexModalContent) {
      navigator.clipboard.writeText(bibtexModalContent.textContent).then(() => {
        showToast('BibTeX citation copied to clipboard!');
      });
    }
  });
}

// Attach event listeners for bibtex buttons
document.querySelectorAll('.btn-bibtex').forEach(button => {
  button.addEventListener('click', () => {
    const key = button.getAttribute('data-key');
    openBibtexModal(key);
  });
});

document.querySelectorAll('.btn-copy-quick').forEach(button => {
  button.addEventListener('click', (e) => {
    e.stopPropagation();
    const key = button.getAttribute('data-key');
    const citation = bibtexRecords[key] || '';
    navigator.clipboard.writeText(citation).then(() => {
      showToast('Citation copied to clipboard!');
    });
  });
});

// Publication Search & Tag Filter
const pubCards = document.querySelectorAll('.pub-card');
const filterBtns = document.querySelectorAll('.filter-btn');
const pubSearchInput = document.getElementById('pub-search');
let currentTag = 'all';

function filterPublications() {
  const searchTerm = (pubSearchInput ? pubSearchInput.value : '').toLowerCase().trim();

  pubCards.forEach(card => {
    const cardTags = card.getAttribute('data-tags') || '';
    const cardContent = card.innerText.toLowerCase();

    const matchesTag = (currentTag === 'all') || cardTags.includes(currentTag);
    const matchesSearch = !searchTerm || cardContent.includes(searchTerm);

    if (matchesTag && matchesSearch) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });

  // Check if no publications matched
  const visibleCards = Array.from(pubCards).filter(card => card.style.display !== 'none');
  let emptyState = document.getElementById('pub-empty-state');
  if (visibleCards.length === 0) {
    if (!emptyState) {
      emptyState = document.createElement('div');
      emptyState.id = 'pub-empty-state';
      emptyState.className = 'col-span-full py-12 text-center text-slate-500 dark:text-slate-400';
      emptyState.innerHTML = '<p class="text-base text-slate-500 italic">No publications matched your search query or filter.</p>';
      const container = document.getElementById('publications-grid');
      if (container) container.appendChild(emptyState);
    } else {
      emptyState.style.display = 'block';
    }
  } else if (emptyState) {
    emptyState.style.display = 'none';
  }
}

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => {
      b.classList.remove('bg-emerald-700', 'text-white', 'dark:bg-emerald-600');
      b.classList.add('bg-slate-100', 'text-slate-700', 'dark:bg-slate-800', 'dark:text-slate-300');
    });
    btn.classList.remove('bg-slate-100', 'text-slate-700', 'dark:bg-slate-800', 'dark:text-slate-300');
    btn.classList.add('bg-emerald-700', 'text-white', 'dark:bg-emerald-600');
    currentTag = btn.getAttribute('data-filter');
    filterPublications();
  });
});

if (pubSearchInput) {
  pubSearchInput.addEventListener('input', filterPublications);
}

// Scrollspy for active nav link
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let scrollY = window.pageYOffset;
  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 120;
    const sectionId = current.getAttribute('id');
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('text-emerald-700', 'dark:text-emerald-400', 'font-semibold');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('text-emerald-700', 'dark:text-emerald-400', 'font-semibold');
        }
      });
    }
  });
});
