// Firebase Configuration (PLACE YOUR KEYS HERE)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Admin Configuration
const ADMIN_UIDS = ["1489195544239800491"]; // Authorized Web-Admin ID

if (typeof firebase !== 'undefined') {
    firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
    const db = firebase.firestore();

    const storeGrid = document.getElementById('store-grid');
    const adminPanel = document.getElementById('admin-panel');
    const navAdmin = document.getElementById('nav-admin');
    const addProductForm = document.getElementById('add-product-form');

    // UI Logic: Dynamic Store Rendering
    const renderStore = (products) => {
        if (!storeGrid) return;
        storeGrid.innerHTML = products.map(p => `
            <div class="product-card">
                <div class="price-tag">$${p.price}</div>
                <img src="${p.image}" class="product-img" alt="${p.name}">
                <div class="product-info">
                    <div class="product-tags">${p.tags}</div>
                    <h3>${p.name}</h3>
                    <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 1.5rem;">${p.desc}</p>
                    <button class="btn-buy">Purchase Now</button>
                </div>
            </div>
        `).join('');
    };

    // Real-time Store Sync
    db.collection('products').orderBy('timestamp', 'desc').onSnapshot(snap => {
        const products = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        renderStore(products);
        document.getElementById('stat-products').innerText = products.length;
    });

    // Admin Status Monitoring
    auth.onAuthStateChanged(async user => {
        const loginBtn = document.getElementById('open-login');
        if (user) {
            loginBtn.innerHTML = `<img src="${user.photoURL}" style="width: 24px; height: 24px; border-radius: 50%; margin-right: 8px; vertical-align: middle;"> ${user.displayName.split(' ')[0]}`;
            loginBtn.onclick = () => { if(confirm('Logout?')) auth.signOut(); };
            
            // Check Admin Status
            if (ADMIN_UIDS.includes(user.uid)) {
                adminPanel.style.display = 'block';
                navAdmin.style.display = 'block';
                document.getElementById('admin-user-name').innerText = user.displayName;
            }
        } else {
            loginBtn.innerHTML = 'Login';
            loginBtn.onclick = () => document.getElementById('login-modal').classList.add('active');
            adminPanel.style.display = 'none';
            navAdmin.style.display = 'none';
        }
    });

    // Add Product Logic
    if (addProductForm) {
        addProductForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = addProductForm.querySelector('button');
            btn.innerText = 'Posting...';
            btn.disabled = true;

            try {
                await db.collection('products').add({
                    name: document.getElementById('prod-name').value,
                    price: document.getElementById('prod-price').value,
                    tags: document.getElementById('prod-tags').value,
                    image: document.getElementById('prod-image').value,
                    desc: document.getElementById('prod-desc').value,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                });
                addProductForm.reset();
                alert('Product posted successfully!');
            } catch (err) {
                alert('Error adding product: ' + err.message);
            } finally {
                btn.innerText = 'Post to Store';
                btn.disabled = false;
            }
        });
    }

    // Modal Toggles (Re-implemented for Firebase flow)
    const loginModal = document.getElementById('login-modal');
    document.getElementById('close-modal').onclick = () => loginModal.classList.remove('active');
    document.getElementById('google-auth').onclick = () => auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    document.getElementById('discord-auth').onclick = () => auth.signInWithPopup(new firebase.auth.OAuthProvider('discord.com'));
    window.onclick = (e) => { if (e.target === loginModal) loginModal.classList.remove('active'); };
}

// Intersection Observer for scroll reveal animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
});

// Active Navigation Highlighting
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section, main');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });

    // Navbar background update on scroll
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(7, 7, 10, 0.95)';
        nav.style.height = '70px';
    } else {
        nav.style.background = 'rgba(7, 7, 10, 0.8)';
        nav.style.height = '80px';
    }
});

// Smooth Scroll for Nav Links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        window.scrollTo({
            top: targetSection.offsetTop,
            behavior: 'smooth'
        });
    });
});

// Initial load fade-in
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});
