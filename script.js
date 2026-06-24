document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // SLAYDER VERİLƏNLƏRİ (İnternet linkləri ilə yenilənmiş hissə)
    // ==========================================================================
    const slidesData = [
        {
            title: "İlham Əliyevin sədrliyi ilə kənd təsərrüfatı məsələlərinə həsr olunmuş müşavirə keçirilib",
            image: "https://isst.gov.az/storage/1222/01KSG8YRS5EQ0AZHN5EKX0H1V6.jpeg"
        },
        {
            title: "WUF 13 forumunda iştirak edən qonaqlar Ceyranbatan su anbarı və Ultrasüzgəcli Sutəmizləyici Qurğular Kompleksində olublar",
            image: "https://isst.gov.az/storage/1189/01KS2J3SMYYBZA3QYMZG5ZAJ8A.jpg"
        },
        {
            title: "ADSEA tərəfindən media nümayəndələrinin məlumatlandırılması məqsədilə mediatur təşkil edilib",
            image: "https://isst.gov.az/storage/1245/01KT7AVFZ6R11VR06JV2TDV0ZN.jfif"
        },
        {
            title: "İlqar Gülməmmədov: “Milli Su Strategiyası su təhlükəsizliyi ilə bağlı uzunmüddətli baxışı müəyyən edən yol xəritəsidir”",
            image: "https://isst.gov.az/storage/1216/01KS4TS3GC88HBKN0W0SGQCWSH.jfif"
        }
    ];

    let currentSlideIndex = 0;
    const heroSlider = document.getElementById('heroSlider');
    const slideTitle = document.getElementById('slideTitle');
    const dots = document.querySelectorAll('#sliderDots .dot');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');

    function updateSlider(index) {
        currentSlideIndex = index;
        
        // Aktiv nöqtənin vizual olaraq dəyişməsi
        const activeDot = document.querySelector('#sliderDots .dot.active');
        if (activeDot) activeDot.classList.remove('active');
        if (dots[index]) dots[index].classList.add('active');
        
        // Mətn və Şəklin dinamik olaraq yenilənməsi
        if (slideTitle) slideTitle.textContent = slidesData[index].title;
        if (heroSlider) {
            heroSlider.style.backgroundImage = `linear-gradient(to top, rgba(7, 59, 58, 0.95), rgba(0,0,0,0.3)), url('${slidesData[index].image}')`;
        }
    }

    // İlk açılışda birinci slaydı yüklə
    if(slidesData.length > 0) {
        updateSlider(0);
    }

    function nextSlide() {
        let nextIndex = (currentSlideIndex + 1) % slidesData.length;
        updateSlider(nextIndex);
    }

    function prevSlide() {
        let prevIndex = (currentSlideIndex - 1 + slidesData.length) % slidesData.length;
        updateSlider(prevIndex);
    }

    // Oxların və nöqtələrin kliklənməsi
    if(nextBtn) nextBtn.addEventListener('click', nextSlide);
    if(prevBtn) prevBtn.addEventListener('click', prevSlide);

    dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => updateSlider(idx));
    });

    // Avtomatik fırlanma (Hər 5 saniyədən bir)
    let autoSlideInterval = setInterval(nextSlide, 5000);

    const resetAutoSlide = () => {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(nextSlide, 5000);
    };

    if(nextBtn) nextBtn.addEventListener('click', resetAutoSlide);
    if(prevBtn) prevBtn.addEventListener('click', resetAutoSlide);
    dots.forEach(dot => dot.addEventListener('click', resetAutoSlide));


    // ==========================================================================
    // ƏLÇATANLIQ PANELİ VƏ ETRAF KODLARIN LOGİKASI
    // ==========================================================================
    
    // Burger Menyu
    const menuToggle = document.getElementById('menuToggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            window.location.href = 'index2.html';
        });
    }

    // Paneli aç/bağla
    const viewToggleBtn = document.getElementById('viewToggleBtn');
    const accessibilityPanel = document.getElementById('accessibilityPanel');
    if (viewToggleBtn && accessibilityPanel) {
        viewToggleBtn.addEventListener('click', () => {
            accessibilityPanel.classList.toggle('show');
        });
    }

    // Şrift Ölçüsü funksiyası
const sizeButtons = document.querySelectorAll('.size-btn');
sizeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // 1. Aktiv düyməni yeniləyirik
        document.querySelector('.size-btn.active').classList.remove('active');
        btn.classList.add('active');
        // 2. Bütün köhnə sinifləri body-dən təmizləyirik
        document.body.classList.remove('font-small', 'font-medium', 'font-large');
        // 3. Yeni sinifi əlavə edirik
        const size = btn.getAttribute('data-size');
        document.body.classList.add('font-' + size);
    });
});

    // Şrift Növü
    const typeButtons = document.querySelectorAll('.type-btn');
    typeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelector('.type-btn.active').classList.remove('active');
            btn.classList.add('active');
            const type = btn.getAttribute('data-type');
            if (type === 'serif') {
                document.body.classList.add('font-serif');
            } else {
                document.body.classList.remove('font-serif');
            }
        });
    });

    // Şəkilləri Gizlət
    const toggleImages = document.getElementById('toggleImages');
    if (toggleImages) {
        toggleImages.addEventListener('change', () => {
            if (toggleImages.checked) {
                document.body.classList.add('hide-images');
            } else {
                document.body.classList.remove('hide-images');
            }
        });
    }

    // Ağ-Qara Rejim
    const toggleMonochrome = document.getElementById('toggleMonochrome');
    if (toggleMonochrome) {
        toggleMonochrome.addEventListener('change', () => {
            if (toggleMonochrome.checked) {
                document.body.classList.add('monochrome');
            } else {
                document.body.classList.remove('monochrome');
            }
        });
    }
});

// ANA SƏHİFƏ ÜÇÜN RƏQƏM SAYĞACI ANIMASIYASI
function animateCounters() {
    animateSingleValue("stat-workers", 12450, 2000);  // 12,450 işçiyə qədər artır
    animateSingleValue("stat-projects", 1840, 2000);   // 1,840 müraciətə qədər artır
    animateSingleValue("stat-resorts", 8, 2000);       // 8 daxili turnir sayına qədər artır
}

function animateSingleValue(id, start, duration) {
    const obj = document.getElementById(id);
    if (!obj) return;
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * start).toLocaleString('az-AZ');
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

document.addEventListener("DOMContentLoaded", () => {
    animateCounters();
});
