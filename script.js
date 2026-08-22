document.documentElement.classList.add('js');

const revealEls=[...document.querySelectorAll('.reveal')];
if('IntersectionObserver' in window){
  const ro=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');ro.unobserve(e.target)}}),{rootMargin:'0px 0px -8% 0px'});
  revealEls.forEach(el=>ro.observe(el));
  window.addEventListener('load',()=>setTimeout(()=>revealEls.forEach(el=>el.classList.add('visible')),1400));
}else revealEls.forEach(el=>el.classList.add('visible'));

const progress=document.getElementById('scroll-progress');
const updateProgress=()=>{const h=document.documentElement.scrollHeight-window.innerHeight;progress.style.width=`${h>0?(window.scrollY/h)*100:0}%`};
window.addEventListener('scroll',updateProgress,{passive:true});updateProgress();

const menuToggle=document.getElementById('menu-toggle');
const siteNav=document.getElementById('site-nav');
menuToggle?.addEventListener('click',()=>{const open=siteNav.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(open));});
siteNav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{siteNav.classList.remove('open');menuToggle?.setAttribute('aria-expanded','false')}));

const navLinks=[...document.querySelectorAll('#site-nav a[href^="#"]')];
const sections=navLinks.map(a=>document.querySelector(a.getAttribute('href'))).filter(Boolean);
if('IntersectionObserver' in window){const no=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')===`#${e.target.id}`))}}),{rootMargin:'-42% 0px -50% 0px'});sections.forEach(s=>no.observe(s));}

document.querySelectorAll('.project-featured').forEach(card=>{const trigger=card.querySelector('.project-expand');trigger?.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();card.classList.toggle('expanded');trigger.textContent=card.classList.contains('expanded')?'↙':'↗';});});

const overlay=document.getElementById('command-overlay');
const input=document.getElementById('command-input');
const commandButtons=[...document.querySelectorAll('[data-command]')];
const openCommand=()=>{overlay.hidden=false;document.body.classList.add('no-scroll');setTimeout(()=>input.focus(),30)};
const closeCommand=()=>{overlay.hidden=true;document.body.classList.remove('no-scroll');input.value='';filterCommands('')};
document.getElementById('command-open')?.addEventListener('click',openCommand);
document.querySelectorAll('[data-close-command]').forEach(el=>el.addEventListener('click',closeCommand));
const destinations={projects:'#projects',skills:'#skills',services:'#services',contact:'#contact',github:'https://github.com/AshishDubey9999',linkedin:'https://www.linkedin.com/in/ashish-dubey-a66a00277'};
commandButtons.forEach(btn=>btn.addEventListener('click',()=>{const dest=destinations[btn.dataset.command];closeCommand();if(dest.startsWith('#'))document.querySelector(dest)?.scrollIntoView({behavior:'smooth'});else window.open(dest,'_blank','noopener,noreferrer')}));
function filterCommands(q){const term=q.trim().toLowerCase();commandButtons.forEach(b=>{b.hidden=!!term&&!b.textContent.toLowerCase().includes(term)});}
input?.addEventListener('input',e=>filterCommands(e.target.value));
document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();overlay.hidden?openCommand():closeCommand()}if(e.key==='Escape'&&!overlay.hidden)closeCommand()});
