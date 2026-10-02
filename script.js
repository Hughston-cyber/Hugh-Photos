const lightbox=document.getElementById('lightbox');
const lightboxImage=document.getElementById('lightbox-image');
const lightboxCaption=document.getElementById('lightbox-caption');

document.querySelectorAll('.photo-button').forEach(button=>{
  button.addEventListener('click',()=>{
    lightboxImage.src=button.dataset.src;
    lightboxImage.alt=button.querySelector('img').alt;
    lightboxCaption.textContent=button.dataset.caption;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden','false');
    document.body.style.overflow='hidden';
  });
});
function closeLightbox(){
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden','true');
  document.body.style.overflow='';
  lightboxImage.src='';
}
document.querySelector('.lightbox-close').addEventListener('click',closeLightbox);
lightbox.addEventListener('click',event=>{if(event.target===lightbox)closeLightbox()});
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeLightbox()});
document.getElementById('year').textContent=new Date().getFullYear();
