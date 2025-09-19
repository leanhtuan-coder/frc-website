// Toggle menu (mobile)
const nav = document.getElementById('nav');
document.getElementById('menuBtn')?.addEventListener('click', ()=> nav.classList.toggle('open'));

// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Reveal on scroll with fallback
let io;
if ('IntersectionObserver' in window) {
  io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('show');
        io.unobserve(e.target);
      }
    });
  }, { threshold: .15 });
} else {
  io = { observe: el => el.classList.add('show') };
  document.querySelectorAll('.reveal').forEach(el=> el.classList.add('show'));
}
document.querySelectorAll('.reveal').forEach(el=> io.observe(el));

// Campus tabs
const tabButtons = document.querySelectorAll('[data-campus-btn]');
const panels = document.querySelectorAll('[data-campus]');
function setCampus(code){
  panels.forEach(p=> p.classList.toggle('active', p.dataset.campus===code));
  tabButtons.forEach(b=> b.classList.toggle('active', b.dataset.campusBtn===code));
  localStorage.setItem('frc_campus_tab', code);
}
if(tabButtons.length){
  tabButtons.forEach(b=> b.addEventListener('click', ()=> setCampus(b.dataset.campusBtn)));
  setCampus(localStorage.getItem('frc_campus_tab') || 'hn');
}

// Back to top
const toTop = document.getElementById('toTop');
window.addEventListener('scroll', ()=>{ if(window.scrollY>400) toTop.classList.add('show'); else toTop.classList.remove('show'); });
toTop?.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));
