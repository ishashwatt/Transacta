// Universal In-App Notification System (Zero Browser Alert Popups)
function showInAppMessage(message, type = 'info', duration = 4000) {
  let container = document.getElementById('inAppToastContainer') || document.querySelector('.inapp-toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'inAppToastContainer';
    container.className = 'inapp-toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `inapp-toast ${type}`;

  let iconSvg = '';
  if (type === 'success') {
    iconSvg = `<svg class="inapp-toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;
  } else if (type === 'error') {
    iconSvg = `<svg class="inapp-toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;
  } else {
    iconSvg = `<svg class="inapp-toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;
  }

  toast.innerHTML = `
    ${iconSvg}
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'toastFadeOut 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards';
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 300);
  }, duration);
}

// Override native alert completely
window.alert = function(msg) {
  showInAppMessage(typeof msg === 'string' ? msg : JSON.stringify(msg), 'info');
};
window.showInAppMessage = showInAppMessage;

document.addEventListener('DOMContentLoaded', () => {
  // Lucide icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // App State
  let currentBudget = 20000;
  let currentNegotiationData = null;
  let currentOrder = null;

  // DOM Elements
  const buyerQueryInput = document.getElementById('buyerQueryInput');
  const startProtocolBtn = document.getElementById('startProtocolBtn');
  const quickChips = document.querySelectorAll('.quick-chip');
  const roundCounter = document.getElementById('roundCounter');
  const roundsStream = document.getElementById('roundsStream');
  const negotiationStatusBadge = document.getElementById('negotiationStatusBadge');
  const finalPriceDisplay = document.getElementById('finalPriceDisplay');
  const dealRoomPayBtn = document.getElementById('dealRoomPayBtn');
  const floatingPayBtn = document.getElementById('floatingPayBtn');
  const triggerWalkAwayBtn = document.getElementById('triggerWalkAwayBtn');

  // Multi-merchant & Deal Score DOM
  const merchantsGrid = document.getElementById('merchantsGrid');
  const topScoreValue = document.getElementById('topScoreValue');
  const scoreNumber = document.getElementById('scoreNumber');
  const barPrice = document.getElementById('barPrice');
  const barSpecs = document.getElementById('barSpecs');
  const barDelivery = document.getElementById('barDelivery');
  const barWarranty = document.getElementById('barWarranty');
  const barTrust = document.getElementById('barTrust');
  const valPrice = document.getElementById('valPrice');
  const valSpecs = document.getElementById('valSpecs');
  const valDelivery = document.getElementById('valDelivery');
  const valWarranty = document.getElementById('valWarranty');
  const valTrust = document.getElementById('valTrust');
  const dealExplanationText = document.getElementById('dealExplanationText');

  // Modal DOM
  const checkoutModalOverlay = document.getElementById('checkoutModalOverlay');
  const modalOrderId = document.getElementById('modalOrderId');
  const modalAmountDisplay = document.getElementById('modalAmountDisplay');
  const modalConfirmPayBtn = document.getElementById('modalConfirmPayBtn');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const auditTableBody = document.getElementById('auditTableBody');
  const refreshAuditBtn = document.getElementById('refreshAuditBtn');

  // Navigation Scrolling
  const navTabBtns = document.querySelectorAll('.nav-link, .nav-tab-btn, .menu-float__item');
  navTabBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetId = btn.getAttribute('data-scroll');
      if (targetId) {
        e.preventDefault();
        const targetElem = document.getElementById(targetId);
        if (targetElem) {
          navTabBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          targetElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // FAQ Accordion Toggles
  const faqButtons = document.querySelectorAll('.faq-question-btn');
  faqButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      if (item) {
        item.classList.toggle('open');
      }
    });
  });

  const searchDropdownMenu = document.getElementById('searchDropdownMenu');

  const typewriterPhrases = [
    "Find me a 144Hz gaming monitor under 20000 rupees",
    "Wireless mechanical keyboard under 8000 rupees",
    "Studio condenser microphone under 12000 rupees",
    "Budget monitor under 15000 rupees for quick test"
  ];
  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let isTypewriterActive = true;
  let typewriterTimeout = null;

  function runTypewriter() {
    if (!isTypewriterActive || (buyerQueryInput && buyerQueryInput.value.length > 0)) return;
    const currentPhrase = typewriterPhrases[phraseIdx];
    if (isDeleting) {
      charIdx--;
      if (buyerQueryInput) buyerQueryInput.setAttribute('placeholder', currentPhrase.substring(0, charIdx));
      if (charIdx <= 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % typewriterPhrases.length;
        typewriterTimeout = setTimeout(runTypewriter, 500);
        return;
      }
      typewriterTimeout = setTimeout(runTypewriter, 30);
    } else {
      charIdx++;
      if (buyerQueryInput) buyerQueryInput.setAttribute('placeholder', currentPhrase.substring(0, charIdx));
      if (charIdx === currentPhrase.length) {
        isDeleting = true;
        typewriterTimeout = setTimeout(runTypewriter, 1800);
        return;
      }
      typewriterTimeout = setTimeout(runTypewriter, 45);
    }
  }

  typewriterTimeout = setTimeout(runTypewriter, 300);

  function updateDropdownPosition() {
    if (!buyerQueryInput || !searchDropdownMenu) return;
    const rect = buyerQueryInput.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;

    if (spaceBelow < 320 && spaceAbove > spaceBelow) {
      searchDropdownMenu.classList.add('open-up');
      searchDropdownMenu.style.maxHeight = Math.min(320, Math.max(160, spaceAbove - 20)) + 'px';
    } else {
      searchDropdownMenu.classList.remove('open-up');
      searchDropdownMenu.style.maxHeight = Math.min(320, Math.max(160, spaceBelow - 20)) + 'px';
    }
  }

  function openDropdown() {
    isTypewriterActive = false;
    clearTimeout(typewriterTimeout);
    updateDropdownPosition();
    if (searchDropdownMenu) searchDropdownMenu.classList.add('active');
  }

  function closeDropdown() {
    if (searchDropdownMenu) {
      searchDropdownMenu.classList.remove('active');
      searchDropdownMenu.classList.remove('open-up');
    }
  }

  if (buyerQueryInput) {
    buyerQueryInput.addEventListener('focus', openDropdown);

    buyerQueryInput.addEventListener('click', (e) => {
      e.stopPropagation();
      openDropdown();
    });

    buyerQueryInput.addEventListener('input', () => {
      isTypewriterActive = false;
      clearTimeout(typewriterTimeout);
    });

    buyerQueryInput.addEventListener('blur', () => {
      if (buyerQueryInput.value.trim() === '') {
        isTypewriterActive = true;
        charIdx = 0;
        isDeleting = false;
        typewriterTimeout = setTimeout(runTypewriter, 600);
      }
    });

    buyerQueryInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        triggerSearchTransaction();
      }
    });
  }

  window.addEventListener('scroll', () => {
    if (searchDropdownMenu && searchDropdownMenu.classList.contains('active')) {
      updateDropdownPosition();
    }
  }, { passive: true });

  window.addEventListener('resize', () => {
    if (searchDropdownMenu && searchDropdownMenu.classList.contains('active')) {
      updateDropdownPosition();
    }
  }, { passive: true });

  document.addEventListener('click', (e) => {
    if (searchDropdownMenu && !e.target.closest('.hero-search-wrapper')) {
      closeDropdown();
    }
  });

  const dropdownItems = document.querySelectorAll('.dropdown-item');
  dropdownItems.forEach(item => {
    item.addEventListener('mousedown', (e) => {
      e.preventDefault();
    });
    item.addEventListener('click', (e) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      const q = item.getAttribute('data-q') || item.querySelector('.dropdown-title')?.textContent?.trim() || "Find me a 144Hz gaming monitor under 20000 rupees";
      const b = parseInt(item.getAttribute('data-budget'), 10) || 20000;
      buyerQueryInput.value = q;
      currentBudget = b;
      closeDropdown();
      isTypewriterActive = false;
      clearTimeout(typewriterTimeout);
      window.location.href = `/negotiation?q=${encodeURIComponent(q)}&budget=${b}`;
    });
  });

  function triggerSearchTransaction() {
    closeDropdown();

    if (!buyerQueryInput.value.trim()) {
      buyerQueryInput.value = typewriterPhrases[phraseIdx] || "Find me a 144Hz gaming monitor under 20000 rupees";
    }

    const val = buyerQueryInput.value.trim();
    let budgetQuery = "";
    const matchBudget = val.match(/(?:under|below|for|cap|budget|max|rs\.?|₹|less than)\s*([0-9]{3,7})/i);
    if (matchBudget && matchBudget[1]) {
      budgetQuery = `&budget=${parseInt(matchBudget[1], 10)}`;
    }

    // Navigate to dedicated live negotiation room
    window.location.href = `/negotiation?q=${encodeURIComponent(val)}${budgetQuery}`;
  }

  if (startProtocolBtn) {
    startProtocolBtn.addEventListener('click', triggerSearchTransaction);
  }

  const navLaunchBtn = document.getElementById('navLaunchBtn');
  if (navLaunchBtn) {
    navLaunchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = '/app';
    });
  }

  const bannerSimulateBtn = document.getElementById('bannerSimulateBtn');
  if (bannerSimulateBtn) {
    bannerSimulateBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = '/app';
    });
  }

  const carouselSlides = document.querySelectorAll('.hero-slide');
  const carouselDots = document.querySelectorAll('.carousel-dot');
  let currentSlide = 0;
  let carouselTimer = null;

  function showSlide(index) {
    if (!carouselSlides.length) return;
    carouselSlides.forEach(slide => slide.classList.remove('active'));
    carouselDots.forEach(dot => dot.classList.remove('active'));
    currentSlide = (index + carouselSlides.length) % carouselSlides.length;
    carouselSlides[currentSlide].classList.add('active');
    if (carouselDots[currentSlide]) {
      carouselDots[currentSlide].classList.add('active');
    }
  }

  function startCarousel() {
    stopCarousel();
    carouselTimer = setInterval(() => {
      showSlide(currentSlide + 1);
    }, 2000);
  }

  function stopCarousel() {
    if (carouselTimer) {
      clearInterval(carouselTimer);
      carouselTimer = null;
    }
  }

  carouselDots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.getAttribute('data-index')) || 0;
      showSlide(idx);
      startCarousel();
    });
  });

  const heroCarousel = document.getElementById('heroCarousel');
  if (heroCarousel) {
    heroCarousel.addEventListener('mouseenter', stopCarousel);
    heroCarousel.addEventListener('mouseleave', startCarousel);
  }

  startCarousel();

  async function runFullProtocolPipeline() {
    if (startProtocolBtn) {
      startProtocolBtn.disabled = true;
      startProtocolBtn.innerHTML = `<i data-lucide="loader-2" class="spin"></i> <span>Evaluating Protocol...</span>`;
      if (window.lucide) window.lucide.createIcons();
    }

    const query = (buyerQueryInput && buyerQueryInput.value.trim()) || "Find me a 144Hz gaming monitor under 20000 rupees";

    try {
      const discoRes = await fetch('/api/dealroom/discover', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, buyerMaxBudget: currentBudget })
      });
      const discoData = await discoRes.json();

      if (discoData && discoData.bestMatch) {
        renderDealScorecard(discoData.bestMatch.dealScore);
      }

      fetchAuditLogs();

    } catch (err) {
      console.error("Protocol execution error:", err);
    } finally {
      if (startProtocolBtn) {
        startProtocolBtn.disabled = false;
        startProtocolBtn.innerHTML = `<span>Start Transacting</span> <i data-lucide="arrow-right" style="width: 16px; height: 16px;"></i>`;
      }
      if (window.lucide) window.lucide.createIcons();
    }
  }

  /* ==========================================================================
     2. MULTI-MERCHANT COMPETITION RENDERER (Feature 4)
     ========================================================================== */
  function renderMultiMerchantGrid(merchants, winnerId) {
    if (!merchantsGrid) return;
    merchantsGrid.innerHTML = merchants.map(m => {
      const isWinner = m.id === winnerId;
      return `
        <div class="merchant-comp-card ${isWinner ? 'winner' : ''}">
          ${isWinner ? '<span class="winner-ribbon">★ Best Overall Value</span>' : ''}
          <div>
            <div class="comp-header">
              <div>
                <div class="comp-merchant-name">${m.name}</div>
                <div class="comp-merchant-sub">${m.location} · <strong>${m.rating} ★</strong> Rating</div>
              </div>
              <div class="comp-score-box">
                <div class="comp-score-label">Score</div>
                <div class="comp-score-value">${m.dealScore.overall}</div>
              </div>
            </div>

            <div class="comp-price-row">
              <div class="comp-price-label">Offered Base Price</div>
              <div class="comp-price">₹${m.product.basePrice.toLocaleString('en-IN')}</div>
            </div>

            <div class="comp-specs">${m.product.name} — ${m.product.specs}</div>

            <div class="comp-meta-grid">
              <div class="comp-meta-item"><span>Delivery</span> <strong>${m.deliveryDays} Days</strong></div>
              <div class="comp-meta-item"><span>Warranty</span> <strong>${m.warrantyMonths} Months</strong></div>
              <div class="comp-meta-item"><span>Trust Score</span> <strong>${m.trustScore} / 100</strong></div>
              <div class="comp-meta-item"><span>Bundle Capacity</span> <strong style="color: var(--vana-orange);">+₹${m.bundleOffer.value} Free</strong></div>
            </div>
          </div>

          <button class="btn-comp-action ${isWinner ? 'btn-winner' : 'btn-ghost'}" onclick="selectMerchantForDeal('${m.id}')">
            <span>${isWinner ? 'Launch Deal Room' : 'Switch & Negotiate'}</span>
            <i data-lucide="arrow-right" style="width: 15px; height: 15px;"></i>
          </button>
        </div>
      `;
    }).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  window.selectMerchantForDeal = function(merchantId) {
    const q = (buyerQueryInput && buyerQueryInput.value.trim()) || "Find me a 144Hz gaming monitor under 20000 rupees";
    window.location.href = `/app?merchantId=${encodeURIComponent(merchantId)}&q=${encodeURIComponent(q)}&budget=${currentBudget}`;
  };

  /* ==========================================================================
     3. EXPLAINABLE DEAL SCORECARD (Feature 5)
     ========================================================================== */
  function renderDealScorecard(score) {
    if (!topScoreValue || !score) return;
    topScoreValue.textContent = score.overall;
    scoreNumber.textContent = `→ ${score.overall} / 100`;

    barPrice.style.width = `${score.price}%`;
    barSpecs.style.width = `${score.specifications}%`;
    barDelivery.style.width = `${score.delivery}%`;
    barWarranty.style.width = `${score.warranty}%`;
    barTrust.style.width = `${score.trust}%`;

    valPrice.textContent = `${score.price} / 100`;
    valSpecs.textContent = `${score.specifications} / 100`;
    valDelivery.textContent = `${score.delivery} / 100`;
    valWarranty.textContent = `${score.warranty} / 100`;
    valTrust.textContent = `${score.trust} / 100`;

    dealExplanationText.textContent = score.reasoning;
  }

  /* ==========================================================================
     4. ANIMATED DEAL ROOM ROUNDS (Features 1, 2 & 8)
     ========================================================================== */
  async function animateDealRoomRounds(rounds) {
    roundsStream.innerHTML = '';
    dealRoomPayBtn.disabled = true;
    floatingPayBtn.disabled = true;

    for (let i = 0; i < rounds.length; i++) {
      const r = rounds[i];
      roundCounter.textContent = `${r.round}`;
      negotiationStatusBadge.textContent = `ROUND ${r.round} • IN FLIGHT`;
      negotiationStatusBadge.style.background = 'var(--color-ochre)';

      await new Promise(res => setTimeout(res, 400));

      const roundDiv = document.createElement('div');
      roundDiv.className = 'round-exchange';

      let bundleHtml = '';
      if (r.isBundleEngaged) {
        bundleHtml = `
          <div class="bundle-highlight-badge">
            <strong>Dynamic Value Bundling Active:</strong> ${r.bundledItems.join(' + ')} (Worth ₹${r.totalPackageValue.toLocaleString('en-IN')})
          </div>
        `;
      }

      roundDiv.innerHTML = `
        <div class="round-tag">
          <span>Round 0${r.round}</span>
          <span style="font-family: var(--font-mono);">${r.status}</span>
        </div>
        <div class="round-dialogue">
          <div class="buyer-talk"><strong>Buyer Agent:</strong> ${r.buyerMessage}</div>
          <div class="merchant-talk"><strong>Merchant Agent:</strong> ${r.merchantMessage}</div>
        </div>
        ${bundleHtml}
      `;

      roundsStream.appendChild(roundDiv);
      roundsStream.scrollTop = roundsStream.scrollHeight;
    }

    const finalRound = rounds[rounds.length - 1];
    if (finalRound.status === "DEAL_ACCEPTED") {
      negotiationStatusBadge.textContent = 'DEAL ACCEPTED';
      negotiationStatusBadge.style.background = 'var(--color-green)';
      finalPriceDisplay.textContent = `₹${finalRound.finalSettlementPrice.toLocaleString('en-IN')}`;
      finalPriceDisplay.style.color = 'var(--color-green)';
      dealRoomPayBtn.disabled = false;
      floatingPayBtn.disabled = false;
      floatingPayBtn.textContent = `Pay ₹${finalRound.finalSettlementPrice.toLocaleString('en-IN')} on Razorpay`;
    }
  }

  if (triggerWalkAwayBtn) {
    triggerWalkAwayBtn.addEventListener('click', () => {
      executeWalkAwaySimulation();
    });
  }

  async function executeWalkAwaySimulation() {
    roundsStream.innerHTML = '';
    roundCounter.textContent = '3';
    negotiationStatusBadge.textContent = 'EVALUATING RESERVATION BOUNDS...';
    negotiationStatusBadge.style.background = 'var(--color-orange)';
    negotiationStatusBadge.style.color = '#fff';

    try {
      const res = await fetch('/api/dealroom/walk-away', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ buyerMaxBudget: 15000, targetProduct: "144Hz Monitor" })
      });
      const data = await res.json();

      for (let i = 0; i < data.failedRounds.length; i++) {
        const r = data.failedRounds[i];
        await new Promise(resolve => setTimeout(resolve, 350));

        const roundDiv = document.createElement('div');
        roundDiv.className = 'round-exchange';
        roundDiv.innerHTML = `
          <div class="round-tag" style="color: var(--color-orange);">
            <span>Round 0${r.round}</span>
            <span style="font-family: var(--font-mono);">${r.status}</span>
          </div>
          <div class="round-dialogue">
            <div class="buyer-talk"><strong>Buyer Agent:</strong> ${r.buyerMessage}</div>
            <div class="merchant-talk"><strong>Merchant Agent:</strong> ${r.merchantMessage}</div>
          </div>
        `;
        roundsStream.appendChild(roundDiv);
      }

      negotiationStatusBadge.textContent = 'NEGOTIATION TERMINATED (WALK AWAY)';
      negotiationStatusBadge.style.background = 'var(--color-orange)';
      finalPriceDisplay.textContent = 'NO TRANSACTION';
      finalPriceDisplay.style.color = 'var(--color-orange)';
      dealRoomPayBtn.disabled = true;
      floatingPayBtn.disabled = true;
      floatingPayBtn.textContent = 'Negotiation Terminated (Safe Exit)';

      fetchAuditLogs();

    } catch (err) {
      console.error("Walk-away error:", err);
    }
  }

  /* ==========================================================================
     6. RAZORPAY PAYMENT SETTLEMENT
     ========================================================================== */
  if (dealRoomPayBtn) dealRoomPayBtn.addEventListener('click', openPaymentModal);
  if (floatingPayBtn) floatingPayBtn.addEventListener('click', () => { window.location.href = '/app'; });

  async function openPaymentModal() {
    try {
      // 1. Check wallet authorization
      const authRes = await fetch('/api/wallet/authorize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 19999, category: "Monitors" })
      });
      const authData = await authRes.json();

      if (!authData.authorized && !authData.stepUpRequired) {
        showInAppMessage("Wallet blocked: " + authData.reason, "error");
        return;
      }

      // 2. Create Razorpay order
      const orderRes = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: 19999,
          currency: 'INR',
          receipt: `rcpt_${Date.now()}`,
          merchantName: currentNegotiationData?.merchant?.name || "GearCraft Studios"
        })
      });
      const orderData = await orderRes.json();
      currentOrder = orderData.order;

      modalOrderId.textContent = orderData.order.id;
      modalAmountDisplay.textContent = `₹${(orderData.order.amount / 100).toLocaleString('en-IN')}`;
      checkoutModalOverlay.style.display = 'flex';

    } catch (err) {
      console.error("Payment modal error:", err);
      showInAppMessage("Payment modal error: " + err.message, "error");
    }
  }

  modalCloseBtn.addEventListener('click', () => {
    checkoutModalOverlay.style.display = 'none';
  });

  modalConfirmPayBtn.addEventListener('click', async () => {
    const selectedMethod = document.querySelector('input[name="modalPayMethod"]:checked').value;
    const simPaymentId = `pay_${Math.random().toString(36).substr(2, 14)}`;
    const simSignature = `sig_${Math.random().toString(36).substr(2, 24)}`;

    try {
      const verifyRes = await fetch('/api/razorpay/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          razorpay_order_id: currentOrder.id,
          razorpay_payment_id: simPaymentId,
          razorpay_signature: simSignature,
          method: selectedMethod
        })
      });
      const verifyData = await verifyRes.json();

      checkoutModalOverlay.style.display = 'none';

      showInAppMessage(`Transaction Settled Successfully! Receipt: ${verifyData.receipt.receiptNumber} • Payment ID: ${verifyData.receipt.paymentId}`, "success", 5000);

      fetchAuditLogs();

    } catch (err) {
      console.error("Verification error:", err);
      showInAppMessage("Verification error: " + err.message, "error");
    }
  });

  /* ==========================================================================
     7. CRYPTOGRAPHIC AUDIT LOGS
     ========================================================================== */
  async function fetchAuditLogs() {
    try {
      const res = await fetch('/api/audit/logs');
      const data = await res.json();
      renderAuditLogs(data.logs);
    } catch (err) {
      console.error("Audit fetch error:", err);
    }
  }

  function renderAuditLogs(logs) {
    if (!logs || logs.length === 0) return;
    auditTableBody.innerHTML = logs.slice(0, 15).map(l => `
      <tr style="border-bottom: 1px solid var(--color-border);">
        <td style="padding: 0.85rem 1rem; color: var(--color-muted); font-size: 11px;">${new Date(l.timestamp).toLocaleTimeString()}</td>
        <td style="padding: 0.85rem 1rem;"><strong>${l.action}</strong></td>
        <td style="padding: 0.85rem 1rem;"><span class="budget-tag" style="height: 22px; font-size: 10px;">${l.actor}</span></td>
        <td style="padding: 0.85rem 1rem; color: var(--color-muted); max-width: 340px;">${formatDetails(l.details)}</td>
        <td style="padding: 0.85rem 1rem;">
          <span class="budget-tag" style="background: ${l.status === 'SUCCESS' ? 'var(--color-green)' : l.status === 'WALK_AWAY' ? 'var(--color-peach)' : 'var(--color-ochre)'}; color: #000; border: none; font-size: 10px;">${l.status}</span>
        </td>
        <td style="padding: 0.85rem 1rem; font-family: var(--font-mono); font-size: 11px; color: var(--color-blue);">${l.hash}</td>
      </tr>
    `).join('');
  }

  function formatDetails(details) {
    if (typeof details === 'string') return details;
    return Object.entries(details).map(([k, v]) => `${k}: ${v}`).join(' · ');
  }

  refreshAuditBtn.addEventListener('click', fetchAuditLogs);

  // Initial execution on boot
  runFullProtocolPipeline();
});
