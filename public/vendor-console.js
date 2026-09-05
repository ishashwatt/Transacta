/* ==========================================================================
   TRANSACTA PROTOCOL — AUTONOMOUS MULTI-MERCHANT CONSOLE (vendor-console.js)
   50 Verified Indian Network Merchants • Inbound Routing & Razorpay Escrow
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Views & Headers
  const vendorGlobalNavHeader = document.getElementById('vendorGlobalNavHeader');
  const vendorListView = document.getElementById('vendorListView');
  const vendorDetailView = document.getElementById('vendorDetailView');
  const backToDealsListBtn = document.getElementById('backToDealsListBtn');

  // List Elements
  const vendorHorizontalCardsContainer = document.getElementById('vendorHorizontalCardsContainer');
  const dealsCountHeader = document.getElementById('dealsCountHeader');
  const vendorStatCount = document.getElementById('vendorStatCount');
  const refreshHorizontalDealsBtn = document.getElementById('refreshHorizontalDealsBtn');

  // Search & Filter Elements
  const vendorSearchInput = document.getElementById('vendorSearchInput');
  const clearVendorSearchBtn = document.getElementById('clearVendorSearchBtn');
  const vendorFilterChipsRow = document.getElementById('vendorFilterChipsRow');
  const filterCountAll = document.getElementById('filterCountAll');
  const filterCountNegotiating = document.getElementById('filterCountNegotiating');
  const filterCountNotStarted = document.getElementById('filterCountNotStarted');
  const filterCountCompleted = document.getElementById('filterCountCompleted');
  const filterCountPaid = document.getElementById('filterCountPaid');
  const filterCountPending = document.getElementById('filterCountPending');

  // Detail View Elements
  const detailDealIdBadge = document.getElementById('detailDealIdBadge');
  const detailPaymentHeaderBadge = document.getElementById('detailPaymentHeaderBadge');
  const activeProductTitle = document.getElementById('activeProductTitle');
  const activeProductSpecs = document.getElementById('activeProductSpecs');
  const activePriceLabel = document.getElementById('activePriceLabel');
  const activeCurrentPrice = document.getElementById('activeCurrentPrice');
  const activeRetailPrice = document.getElementById('activeRetailPrice');
  const activeWholesaleCost = document.getElementById('activeWholesaleCost');
  const activeMarginFloor = document.getElementById('activeMarginFloor');
  const activeInitialBid = document.getElementById('activeInitialBid');
  const activeBundles = document.getElementById('activeBundles');
  const activeBuyerNameTitle = document.getElementById('activeBuyerNameTitle');

  const vendorChatMessages = document.getElementById('vendorChatMessages');
  const vendorBotReplyInput = document.getElementById('vendorBotReplyInput');
  const sendBotReplyBtn = document.getElementById('sendBotReplyBtn');
  const autoAcceptDealBtn = document.getElementById('autoAcceptDealBtn');

  // Summary Panel Elements
  const detailStatusBadge = document.getElementById('detailStatusBadge');
  const summaryNegotiationState = document.getElementById('summaryNegotiationState');
  const summaryAgreedPrice = document.getElementById('summaryAgreedPrice');
  const summaryPaymentGatewayMode = document.getElementById('summaryPaymentGatewayMode');
  const summaryRazorpayId = document.getElementById('summaryRazorpayId');
  const summaryNoticeText = document.getElementById('summaryNoticeText');
  const summaryInvoiceBox = document.getElementById('summaryInvoiceBox');
  const vendorViewInvoiceBtn = document.getElementById('vendorViewInvoiceBtn');
  const vendorDownloadInvoiceBtn = document.getElementById('vendorDownloadInvoiceBtn');

  let activeDealId = null;
  let cachedDeals = [];
  let lastDealsJson = '';
  let isHoveringCards = false;
  let currentFilter = 'ALL';
  let currentSearchQuery = '';
  let visibleLimit = 4;
  let isUserScrolledUp = false;
  let lastRenderedChatDealId = null;
  let lastRenderedChatHistoryJson = '';
  let initialUrlChecked = false;

  if (vendorChatMessages) {
    vendorChatMessages.addEventListener('scroll', () => {
      // If the user scrolls up (more than 40px away from bottom), mark that user is scrolled up
      const distanceFromBottom = vendorChatMessages.scrollHeight - vendorChatMessages.scrollTop - vendorChatMessages.clientHeight;
      isUserScrolledUp = distanceFromBottom > 40;
    });
  }

  if (vendorHorizontalCardsContainer) {
    vendorHorizontalCardsContainer.addEventListener('mouseenter', () => {
      isHoveringCards = true;
    });
    vendorHorizontalCardsContainer.addEventListener('mouseleave', () => {
      isHoveringCards = false;
    });
  }

  // Switch between Views
  function showListView() {
    activeDealId = null;
    if (window.location.search) {
      window.history.replaceState(null, '', window.location.pathname);
    }
    // Restore global header when returning to list view
    if (vendorGlobalNavHeader) vendorGlobalNavHeader.style.display = 'flex';
    if (vendorDetailView) vendorDetailView.style.display = 'none';
    if (vendorListView) {
      vendorListView.style.display = 'block';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function showDetailView(dealId) {
    activeDealId = dealId;
    isUserScrolledUp = false;
    lastRenderedChatDealId = null;
    lastRenderedChatHistoryJson = '';
    const deal = cachedDeals.find(d => d.id === dealId);
    if (!deal) return;

    window.history.replaceState(null, '', `?dealId=${encodeURIComponent(dealId)}`);

    // Hide global navigation header so ONLY the detail back button exists and content comes up fully
    if (vendorGlobalNavHeader) vendorGlobalNavHeader.style.display = 'none';
    if (vendorListView) vendorListView.style.display = 'none';
    if (vendorDetailView) {
      vendorDetailView.style.display = 'block';
      renderActiveDealDetail(deal);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  if (backToDealsListBtn) {
    backToDealsListBtn.addEventListener('click', showListView);
  }

  // Update dynamic counts on filter chips
  function updateFilterCounts(deals) {
    if (!deals) return;
    if (filterCountAll) filterCountAll.textContent = deals.length;
    if (filterCountNegotiating) {
      filterCountNegotiating.textContent = deals.filter(d => d.status === 'NEGOTIATING').length;
    }
    if (filterCountNotStarted) {
      filterCountNotStarted.textContent = deals.filter(d => d.status === 'NOT_STARTED' || d.status === 'PENDING').length;
    }
    if (filterCountCompleted) {
      filterCountCompleted.textContent = deals.filter(d => d.status === 'COMPLETED' || d.status === 'SETTLED' || d.status === 'AGREED').length;
    }
    if (filterCountPaid) {
      filterCountPaid.textContent = deals.filter(d => d.paymentMode === 'SETTLED' || d.status === 'SETTLED').length;
    }
    if (filterCountPending) {
      filterCountPending.textContent = deals.filter(d => d.paymentMode !== 'SETTLED' && d.status !== 'SETTLED').length;
    }
  }

  // 1. Fetch Inbound Deals
  async function fetchVendorDeals(force = false) {
    try {
      const res = await fetch('/api/vendor/deals');
      const data = await res.json();
      if (data.success && data.deals) {
        cachedDeals = data.deals;
        updateFilterCounts(data.deals);

        const currentJson = JSON.stringify(data.deals.map(d => ({
          id: d.id,
          status: d.status,
          agreed: d.finalAgreedPrice,
          bid: d.buyerInitialOffer,
          time: d.displayTime
        })));

        // Only re-render cards if data has changed AND user is not actively hovering over the cards (prevents flickering)
        if (force === true || (currentJson !== lastDealsJson && !isHoveringCards)) {
          lastDealsJson = currentJson;
          renderHorizontalCards(data.deals);
        }

        // If currently in detail view, update active deal content
        if (activeDealId) {
          const current = data.deals.find(d => d.id === activeDealId);
          if (current) renderActiveDealDetail(current);
        } else if (!initialUrlChecked && window.location.search) {
          initialUrlChecked = true;
          const urlDealId = new URLSearchParams(window.location.search).get('dealId');
          if (urlDealId) {
            const targetDeal = data.deals.find(d => d.id === urlDealId);
            if (targetDeal) {
              showDetailView(urlDealId);
            }
          }
        }
      }
    } catch (err) {
      console.warn("Could not fetch deals:", err);
    }
  }

  // 2. Render Thin Horizontal Cards Covering the Screen (Minimal, Professional, Dynamic Priority & Filtered)
  function renderHorizontalCards(deals) {
    if (!vendorHorizontalCardsContainer) return;
    vendorHorizontalCardsContainer.innerHTML = '';

    // Dynamic Priority Sorting:
    // 1. NEGOTIATING -> Always on TOP!
    // 2. NOT_STARTED / PENDING -> Upper priority!
    // 3. AGREED -> Mid priority!
    // 4. SETTLED / COMPLETED (payment done) -> Always drops to BOTTOM!
    const priorityMap = {
      'NEGOTIATING': 1,
      'NOT_STARTED': 2,
      'PENDING': 2,
      'AGREED': 3,
      'SETTLED': 4,
      'COMPLETED': 4
    };

    const sortedDeals = [...(deals || [])].sort((a, b) => {
      const pA = priorityMap[a.status] || 3;
      const pB = priorityMap[b.status] || 3;
      if (pA !== pB) return pA - pB;
      return new Date(b.timestamp || 0) - new Date(a.timestamp || 0);
    });

    // Apply Filter & Search
    const filtered = sortedDeals.filter(deal => {
      // 1. Category Filter
      if (currentFilter === 'NEGOTIATING' && deal.status !== 'NEGOTIATING') return false;
      if (currentFilter === 'NOT_STARTED' && (deal.status !== 'NOT_STARTED' && deal.status !== 'PENDING')) return false;
      if (currentFilter === 'COMPLETED' && (deal.status !== 'COMPLETED' && deal.status !== 'SETTLED' && deal.status !== 'AGREED')) return false;
      if (currentFilter === 'PAYMENT_RECEIVED' && (deal.paymentMode !== 'SETTLED' && deal.status !== 'SETTLED')) return false;
      if (currentFilter === 'PAYMENT_NOT_RECEIVED' && (deal.paymentMode === 'SETTLED' || deal.status === 'SETTLED')) return false;

      // 2. Search Query
      if (currentSearchQuery.trim()) {
        const q = currentSearchQuery.trim().toLowerCase();
        const buyer = (deal.buyerName || '').toLowerCase();
        const product = (deal.productTitle || '').toLowerCase();
        const id = (deal.id || '').toLowerCase();
        if (!buyer.includes(q) && !product.includes(q) && !id.includes(q)) {
          return false;
        }
      }
      return true;
    });

    if (dealsCountHeader) dealsCountHeader.textContent = filtered.length;
    if (vendorStatCount) vendorStatCount.textContent = `${deals.length} Inbound`;

    if (filtered.length === 0) {
      if (!deals || deals.length === 0) {
        vendorHorizontalCardsContainer.innerHTML = `
          <div class="vendor-empty-filter-state" style="padding: 3.5rem 1.5rem; text-align: center;">
            <i data-lucide="inbox" style="width: 36px; height: 36px; color: #94a3b8; margin-bottom: 0.75rem; opacity: 0.7;"></i>
            <div style="font-size: 16px; font-weight: 700; color: #0f172a; margin-bottom: 0.35rem;">No Active Inbound Inquiries</div>
            <div style="font-size: 13.5px; color: #64748b; max-width: 540px; margin: 0 auto; line-height: 1.55;">The multi-merchant autonomous routing network is actively listening. For live transaction simulation, kindly initiate a transaction on the Buyer Deal Room; autonomous vendor bots will assign sellers, negotiate margins, and populate deals here in real time.</div>
          </div>
        `;
      } else {
        vendorHorizontalCardsContainer.innerHTML = `
          <div class="vendor-empty-filter-state">
            <i data-lucide="filter" style="width: 24px; height: 24px; color: #94a3b8; margin-bottom: 0.5rem;"></i>
            <div style="font-weight: 700; color: #0f172a; margin-bottom: 0.25rem;">No Matching Requests Found</div>
            <div style="font-size: 13px; color: #64748b;">No buyer requests match the active filter or search keyword. Try selecting another filter or clearing search.</div>
          </div>
        `;
      }
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    // Paginate: render up to visibleLimit
    const visibleDeals = filtered.slice(0, visibleLimit);

    visibleDeals.forEach(deal => {
      const card = document.createElement('div');
      card.className = 'vendor-horizontal-card';
      card.id = `hcard_${deal.id}`;

      // Clean Status Indicator (Subtle, professional, not childish)
      const isCompleted = deal.status === 'SETTLED' || deal.status === 'AGREED';
      let statusHtml = '';
      if (isCompleted) {
        statusHtml = `
          <div class="card-status-clean completed">
            <span class="card-status-dot"></span>
            <span>Completed</span>
          </div>
        `;
      } else {
        statusHtml = `
          <div class="card-status-clean negotiating">
            <span class="card-status-dot"></span>
            <span>Negotiating</span>
          </div>
        `;
      }

      // Plain clean user name (no bot suffix)
      const cleanBuyerName = (deal.buyerName || 'User').replace(/\s*\([^)]*\)/g, '').trim();
      const initials = cleanBuyerName.split(' ').map(n => n[0]).slice(0, 2).join('') || 'U';

      // Assigned merchant info
      const merchantName = deal.merchantName || 'Verified Merchant';
      const merchantCity = deal.merchantCity || 'India';
      const mInitials = merchantName.split(/\s+/).slice(0, 2).map(w => w[0]).join('').toUpperCase() || 'VM';

      // Unboxed clean action link: "View →" if completed, "Negotiate →" if negotiating
      const actionText = isCompleted ? 'View →' : 'Negotiate →';

      card.innerHTML = `
        <!-- Column 1: Assigned Merchant -->
        <div class="card-merchant-col">
          <div class="card-merchant-avatar">${mInitials}</div>
          <div class="card-merchant-info">
            <span class="card-merchant-name" title="${merchantName}">${merchantName}</span>
            <span class="card-merchant-city">${merchantCity}</span>
          </div>
        </div>

        <!-- Column 2: Buyer Info & Time -->
        <div class="card-buyer-col">
          <div class="card-buyer-avatar">${initials}</div>
          <div class="card-buyer-info">
            <span class="card-buyer-name" title="${cleanBuyerName}">${cleanBuyerName}</span>
            <span class="card-time-pill">${deal.displayTime || 'Just now'}</span>
          </div>
        </div>

        <!-- Column 3: Product Title -->
        <div class="card-product-col">
          <span class="card-product-title" title="${deal.productTitle}">${deal.productTitle}</span>
        </div>

        <!-- Column 4: Price Ask vs Retail MSRP -->
        <div class="card-price-col">
          <span class="card-price-ask">₹${(deal.buyerInitialOffer || 0).toLocaleString('en-IN')}</span>
          <span class="card-price-retail">₹${(deal.retailPrice || 0).toLocaleString('en-IN')}</span>
        </div>

        <!-- Column 5: Deal Status -->
        <div>
          ${statusHtml}
        </div>

        <!-- Column 6: Unboxed Clean Action Link -->
        <div style="text-align: right;">
          <span class="card-action-text-link">${actionText}</span>
        </div>
      `;

      card.addEventListener('click', () => {
        showDetailView(deal.id);
      });

      vendorHorizontalCardsContainer.appendChild(card);
    });

    // "View More" (Load More) Button if there are more filtered requests beyond visibleLimit
    if (filtered.length > visibleLimit) {
      const remainingCount = filtered.length - visibleLimit;
      const loadMoreContainer = document.createElement('div');
      loadMoreContainer.className = 'vendor-load-more-container';
      loadMoreContainer.innerHTML = `
        <button id="vendorLoadMoreBtn" class="vendor-load-more-btn" type="button">
          <span>View More Requests (${remainingCount} remaining)</span>
          <i data-lucide="chevron-down" style="width: 14px; height: 14px;"></i>
        </button>
      `;

      loadMoreContainer.querySelector('#vendorLoadMoreBtn').addEventListener('click', (e) => {
        e.stopPropagation();
        visibleLimit += 4;
        renderHorizontalCards(cachedDeals);
      });

      vendorHorizontalCardsContainer.appendChild(loadMoreContainer);
    }

    if (window.lucide) window.lucide.createIcons();
  }

  // 3. Render Dedicated Deal & AI Chatbot Workspace
  function renderActiveDealDetail(deal) {
    if (!deal) return;

    if (detailDealIdBadge) {
      const numMatch = (deal.id || '').match(/\d+/);
      const cleanNum = numMatch ? numMatch[0] : deal.id;
      detailDealIdBadge.textContent = `Request #${cleanNum}`;
    }

    // Header payment pill
    if (detailPaymentHeaderBadge) {
      if (deal.paymentMode === 'SETTLED') {
        detailPaymentHeaderBadge.className = 'vendor-payment-state-badge settled';
        detailPaymentHeaderBadge.innerHTML = `<i data-lucide="check-circle-2" style="width: 13px; height: 13px;"></i><span>SETTLED VIA RAZORPAY</span>`;
      } else if (deal.paymentMode === 'ACTIVATED') {
        detailPaymentHeaderBadge.className = 'vendor-payment-state-badge activated';
        detailPaymentHeaderBadge.innerHTML = `<i data-lucide="unlock" style="width: 13px; height: 13px;"></i><span>PAYMENT ACTIVATED</span>`;
      } else {
        detailPaymentHeaderBadge.className = 'vendor-payment-state-badge locked';
        detailPaymentHeaderBadge.innerHTML = `<i data-lucide="lock" style="width: 13px; height: 13px;"></i><span>PAYMENT LOCKED</span>`;
      }
    }

    // Product & Economics
    if (activeProductTitle) activeProductTitle.textContent = deal.productTitle;
    if (activeProductSpecs) activeProductSpecs.textContent = deal.productSpecs || deal.productCategory || 'Catalog Specification';
    
    // Price display: If price is agreed or settled, show Final Price. Otherwise show live negotiation offer.
    const activeOfferTypeLabel = document.getElementById('activeOfferTypeLabel');
    if (deal.finalAgreedPrice) {
      if (activePriceLabel) activePriceLabel.textContent = 'Final Price';
      if (activeCurrentPrice) activeCurrentPrice.textContent = `₹${deal.finalAgreedPrice.toLocaleString('en-IN')}`;
      if (activeOfferTypeLabel) activeOfferTypeLabel.textContent = 'Buyer Initial Offer:';
      if (activeInitialBid) activeInitialBid.textContent = `₹${(deal.buyerInitialOffer || 0).toLocaleString('en-IN')}`;
    } else {
      if (activePriceLabel) activePriceLabel.textContent = 'Current User Offer';
      if (activeCurrentPrice) activeCurrentPrice.textContent = `₹${(deal.buyerInitialOffer || 0).toLocaleString('en-IN')}`;
      if (activeOfferTypeLabel) activeOfferTypeLabel.textContent = 'Current User Offer:';
      if (activeInitialBid) activeInitialBid.textContent = `₹${(deal.buyerInitialOffer || 0).toLocaleString('en-IN')}`;
    }
    if (activeWholesaleCost) activeWholesaleCost.textContent = `₹${(deal.wholesaleCost || 0).toLocaleString('en-IN')}`;
    if (activeMarginFloor) activeMarginFloor.textContent = `+14.0% (₹${(deal.wholesaleMarginFloor || 0).toLocaleString('en-IN')} Floor)`;
    if (activeBundles) activeBundles.textContent = (deal.bundleOffer || []).join(' + ') || 'None';
    if (activeBuyerNameTitle) {
      activeBuyerNameTitle.textContent = (deal.buyerName || 'User').replace(/\s*\([^)]*\)/g, '').trim();
    }

    // Dynamic Merchant Badging
    const activeMerchantBadge = document.getElementById('activeMerchantBadge');
    const activeMerchantLocationBadge = document.getElementById('activeMerchantLocationBadge');
    const footerMerchantName = document.getElementById('footerMerchantName');
    const footerMerchantGstin = document.getElementById('footerMerchantGstin');

    if (activeMerchantBadge) {
      activeMerchantBadge.textContent = `Assigned Merchant: ${deal.merchantName || 'Verified Merchant'}`;
    }
    if (activeMerchantLocationBadge) {
      activeMerchantLocationBadge.textContent = `${deal.merchantCity || 'India'}${deal.merchantCategory ? ` • ${deal.merchantCategory}` : ''}`;
    }
    if (footerMerchantName) {
      footerMerchantName.textContent = deal.merchantName || '50 Verified Indian Businesses';
    }
    if (footerMerchantGstin) {
      footerMerchantGstin.textContent = `GSTIN: ${deal.merchantGstin || '29AABCU9603R1ZM'} • Escrow Acct: rzp_acc_${(deal.merchantId || 'v_01').replace('v_', '')}`;
    }

    // Chat Conversation (Intelligent scroll preservation - avoids snapping down when scrolled up)
    if (vendorChatMessages) {
      const chatHistory = deal.chatHistory || [];
      const currentChatJson = JSON.stringify(chatHistory);

      // Only re-render if chat history changed or switching deals
      if (currentChatJson !== lastRenderedChatHistoryJson || deal.id !== lastRenderedChatDealId) {
        const prevScrollTop = vendorChatMessages.scrollTop;
        const wasScrolledUp = isUserScrolledUp;
        const isNewDeal = deal.id !== lastRenderedChatDealId;

        lastRenderedChatHistoryJson = currentChatJson;
        lastRenderedChatDealId = deal.id;

        vendorChatMessages.innerHTML = '';
        chatHistory.forEach(msg => {
          const bubble = document.createElement('div');
          const isBuyer = msg.sender === 'buyer';
          bubble.className = `vendor-chat-msg ${isBuyer ? 'buyer' : 'merchant'}`;

          const senderDisplayName = isBuyer
            ? (msg.name || 'Buyer').replace(/\s*\([^)]*\)/g, '').trim()
            : (deal.merchantName ? `${deal.merchantName} Bot` : 'Merchant Bot');

          bubble.innerHTML = `
            <div class="vendor-chat-meta">
              <span style="color: ${isBuyer ? '#334155' : '#0284c7'}; font-weight: 800;">${senderDisplayName}</span>
              <span style="color: #94a3b8; font-weight: 500;">${msg.time || ''}</span>
            </div>
            <div>${msg.message}</div>
          `;
          vendorChatMessages.appendChild(bubble);
        });

        if (isNewDeal || !wasScrolledUp) {
          // New deal opened or user was already at the bottom -> show latest message
          vendorChatMessages.scrollTop = vendorChatMessages.scrollHeight;
          isUserScrolledUp = false;
        } else {
          // User was scrolled up reviewing older messages -> preserve exact scroll position without snapping down!
          vendorChatMessages.scrollTop = prevScrollTop;
        }
      }
    }

    // Deal Status & Settlement Summary Panel
    const isSettled = deal.paymentMode === 'SETTLED' || deal.status === 'SETTLED';
    const isAgreed = deal.paymentMode === 'ACTIVATED' || deal.status === 'AGREED' || deal.status === 'COMPLETED';

    if (detailStatusBadge) {
      if (isSettled) {
        detailStatusBadge.className = 'summary-status-pill completed';
        detailStatusBadge.textContent = 'Settled & Dispatched';
      } else if (isAgreed) {
        detailStatusBadge.className = 'summary-status-pill completed';
        detailStatusBadge.textContent = 'Price Agreed';
      } else {
        detailStatusBadge.className = 'summary-status-pill';
        detailStatusBadge.textContent = 'Negotiating';
      }
    }

    if (summaryNegotiationState) {
      if (isSettled) {
        summaryNegotiationState.innerHTML = `<span style="color: #16a34a;">Deal Concluded &amp; Settled</span>`;
      } else if (isAgreed) {
        summaryNegotiationState.innerHTML = `<span style="color: #0284c7;">Consensus Reached (Awaiting Buyer Checkout)</span>`;
      } else {
        summaryNegotiationState.innerHTML = `<span style="color: #d97706;">Live AI Bot Negotiation in Progress</span>`;
      }
    }

    if (summaryAgreedPrice) {
      if (deal.finalAgreedPrice) {
        summaryAgreedPrice.textContent = `₹${deal.finalAgreedPrice.toLocaleString('en-IN')}`;
      } else {
        summaryAgreedPrice.textContent = `Negotiating (Buyer Bid: ₹${(deal.buyerInitialOffer || 0).toLocaleString('en-IN')})`;
      }
    }

    if (summaryPaymentGatewayMode) {
      if (isSettled) {
        summaryPaymentGatewayMode.style.color = '#16a34a';
        summaryPaymentGatewayMode.innerHTML = `<i data-lucide="check-circle-2" style="width: 14px; height: 14px; vertical-align: middle;"></i> Paid via Razorpay`;
      } else if (isAgreed) {
        summaryPaymentGatewayMode.style.color = '#0284c7';
        summaryPaymentGatewayMode.innerHTML = `<i data-lucide="unlock" style="width: 14px; height: 14px; vertical-align: middle;"></i> Razorpay Checkout Unlocked`;
      } else {
        summaryPaymentGatewayMode.style.color = '#dc2626';
        summaryPaymentGatewayMode.innerHTML = `<i data-lucide="lock" style="width: 14px; height: 14px; vertical-align: middle;"></i> Payment Locked (Negotiating)`;
      }
    }

    if (summaryRazorpayId) {
      if (isSettled) {
        summaryRazorpayId.textContent = `ID: ${deal.paymentId || 'pay_live_instant_confirmed'}`;
        summaryRazorpayId.style.color = '#16a34a';
      } else if (isAgreed) {
        summaryRazorpayId.textContent = `Ready for instant checkout`;
        summaryRazorpayId.style.color = '#0284c7';
      } else {
        summaryRazorpayId.textContent = `Awaiting deal consensus`;
        summaryRazorpayId.style.color = '#64748b';
      }
    }

    if (summaryNoticeText) {
      if (isSettled) {
        summaryNoticeText.textContent = `Payment confirmed via Razorpay. Order dispatched and unit margin verified against wholesale floor.`;
      } else if (isAgreed) {
        summaryNoticeText.textContent = `Price handshake reached at ₹${(deal.finalAgreedPrice || 0).toLocaleString('en-IN')}. Razorpay checkout has been enabled for the buyer.`;
      } else {
        summaryNoticeText.textContent = `Transacta protocol keeps Razorpay payment locked until buyer and seller AI agents reach consensus. Once agreement is locked, checkout unlocks automatically.`;
      }
    }

    // Invoice Options (Shown on Right Panel Once Payment is Settled)
    if (summaryInvoiceBox) {
      if (isSettled) {
        summaryInvoiceBox.style.display = 'flex';
        const invoiceUrl = `/invoice?orderId=${encodeURIComponent(deal.id)}`;
        if (vendorViewInvoiceBtn) vendorViewInvoiceBtn.href = invoiceUrl;
        if (vendorDownloadInvoiceBtn) {
          vendorDownloadInvoiceBtn.href = invoiceUrl;
          vendorDownloadInvoiceBtn.onclick = (e) => {
            e.preventDefault();
            const w = window.open(invoiceUrl, '_blank');
            if (w) {
              w.onload = () => { setTimeout(() => w.print(), 500); };
            }
          };
        }
      } else {
        summaryInvoiceBox.style.display = 'none';
      }
    }

    if (window.lucide) window.lucide.createIcons();
  }

  // 4. Send Custom Bot Reply to User
  async function sendBotReply() {
    if (!activeDealId) return;
    const text = vendorBotReplyInput.value.trim();
    if (!text) return;

    vendorBotReplyInput.disabled = true;
    sendBotReplyBtn.disabled = true;

    try {
      const res = await fetch(`/api/vendor/deals/${activeDealId}/reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, sender: 'merchant' })
      });
      const data = await res.json();
      if (data.success && data.deal) {
        vendorBotReplyInput.value = '';
        isUserScrolledUp = false;
        renderActiveDealDetail(data.deal);
        fetchVendorDeals();
      }
    } catch (e) {
      console.error("Bot reply error:", e);
    } finally {
      vendorBotReplyInput.disabled = false;
      sendBotReplyBtn.disabled = false;
      vendorBotReplyInput.focus();
    }
  }

  // 5. Auto-Accept & Unlock Payment Action
  async function autoAcceptAndUnlockPayment() {
    if (!activeDealId) return;
    autoAcceptDealBtn.disabled = true;
    const prevHtml = autoAcceptDealBtn.innerHTML;
    autoAcceptDealBtn.innerHTML = `<span>Unlocking Razorpay...</span>`;
    try {
      const res = await fetch(`/api/vendor/deals/${activeDealId}/reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'accept' })
      });
      const data = await res.json();
      if (data.success && data.deal) {
        isUserScrolledUp = false;
        renderActiveDealDetail(data.deal);
        fetchVendorDeals();
      }
    } catch (e) {
      console.error("Auto-accept error:", e);
    } finally {
      autoAcceptDealBtn.disabled = false;
      autoAcceptDealBtn.innerHTML = prevHtml;
      if (window.lucide) window.lucide.createIcons();
    }
  }

  // Event Listeners
  if (sendBotReplyBtn) sendBotReplyBtn.addEventListener('click', sendBotReply);
  if (autoAcceptDealBtn) autoAcceptDealBtn.addEventListener('click', autoAcceptAndUnlockPayment);
  if (vendorBotReplyInput) {
    vendorBotReplyInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') sendBotReply();
    });
  }

  // Search Input Handler
  if (vendorSearchInput) {
    vendorSearchInput.addEventListener('input', (e) => {
      currentSearchQuery = e.target.value || '';
      visibleLimit = 4;
      if (clearVendorSearchBtn) {
        clearVendorSearchBtn.style.display = currentSearchQuery.trim() ? 'block' : 'none';
      }
      renderHorizontalCards(cachedDeals);
    });
  }

  // Clear Search Button
  if (clearVendorSearchBtn) {
    clearVendorSearchBtn.addEventListener('click', () => {
      if (vendorSearchInput) vendorSearchInput.value = '';
      currentSearchQuery = '';
      visibleLimit = 4;
      clearVendorSearchBtn.style.display = 'none';
      renderHorizontalCards(cachedDeals);
      if (vendorSearchInput) vendorSearchInput.focus();
    });
  }

  // Filter Chip Buttons
  if (vendorFilterChipsRow) {
    const chips = vendorFilterChipsRow.querySelectorAll('.vendor-filter-chip');
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        chips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        currentFilter = chip.getAttribute('data-filter') || 'ALL';
        visibleLimit = 4;
        renderHorizontalCards(cachedDeals);
      });
    });
  }

  if (refreshHorizontalDealsBtn) {
    refreshHorizontalDealsBtn.addEventListener('click', () => fetchVendorDeals(true));
  }

  // 50 Verified Merchants Directory Modal
  const openVendorsDirectoryBtn = document.getElementById('openVendorsDirectoryBtn');
  const viewDirectoryModalBtn = document.getElementById('viewDirectoryModalBtn');
  const vendorsDirectoryModalBackdrop = document.getElementById('vendorsDirectoryModalBackdrop');
  const closeVendorsDirectoryModalBtn = document.getElementById('closeVendorsDirectoryModalBtn');
  const modalDoneBtn = document.getElementById('modalDoneBtn');
  const modalVendorSearchInput = document.getElementById('modalVendorSearchInput');
  const modalVendorsGrid = document.getElementById('modalVendorsGrid');
  const modalVendorsCount = document.getElementById('modalVendorsCount');

  // Copy Curl Button
  const copyVendorCurlBtn = document.getElementById('copyVendorCurlBtn');
  const copyVendorCurlText = document.getElementById('copyVendorCurlText');

  let cachedVendorsDirectory = [];

  async function loadVendorsDirectory() {
    try {
      const res = await fetch('/api/vendor/directory');
      const data = await res.json();
      if (data.success && data.vendors) {
        cachedVendorsDirectory = data.vendors;
        renderModalVendors(cachedVendorsDirectory);
      }
    } catch (e) {
      console.warn("Could not load vendors directory:", e);
    }
  }

  function renderModalVendors(vendors) {
    if (!modalVendorsGrid) return;
    modalVendorsGrid.innerHTML = '';

    const q = (modalVendorSearchInput ? modalVendorSearchInput.value : '').trim().toLowerCase();
    const filtered = (vendors || []).filter(v => {
      if (!q) return true;
      return (v.name || '').toLowerCase().includes(q) ||
             (v.city || '').toLowerCase().includes(q) ||
             (v.category || '').toLowerCase().includes(q) ||
             (v.gstin || '').toLowerCase().includes(q);
    });

    if (modalVendorsCount) {
      modalVendorsCount.textContent = `Showing ${filtered.length} of ${vendors.length} merchants`;
    }

    if (filtered.length === 0) {
      modalVendorsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: #64748b;">
          No merchants found matching "${q}".
        </div>
      `;
      return;
    }

    filtered.forEach(v => {
      const row = document.createElement('div');
      row.className = 'vendor-directory-row';
      const initials = v.name.split(/\s+/).slice(0, 2).map(w => w[0]).join('').toUpperCase() || 'VM';

      row.innerHTML = `
        <div class="vdr-merchant-info">
          <div class="vdr-avatar">${initials}</div>
          <div style="min-width: 0;">
            <div class="vdr-name" title="${v.name}">${v.name}</div>
            <div class="vdr-city">${v.city}, ${v.state}</div>
          </div>
        </div>
        <div class="vdr-category">
          <span class="vdr-badge">${v.category}</span>
        </div>
        <div class="vdr-stats">
          <span>Trust: <strong style="color: #0284c7;">${v.trustScore}%</strong></span>
          <span style="color: #64748b; font-size: 11px;">Rating: <strong>${v.rating}</strong> / 5.0</span>
        </div>
        <div class="vdr-sla">
          <span>${v.deliveryDays}d Dispatch</span>
          <span style="color: #cbd5e1;">•</span>
          <span>${v.warrantyMonths}mo Warranty</span>
        </div>
        <div class="vdr-gstin">
          <code>${v.gstin}</code>
        </div>
      `;
      modalVendorsGrid.appendChild(row);
    });

    if (window.lucide) window.lucide.createIcons();
  }

  function openDirectoryModal() {
    if (vendorsDirectoryModalBackdrop) {
      vendorsDirectoryModalBackdrop.style.display = 'flex';
      if (cachedVendorsDirectory.length === 0) {
        loadVendorsDirectory();
      } else {
        renderModalVendors(cachedVendorsDirectory);
      }
      if (modalVendorSearchInput) {
        modalVendorSearchInput.value = '';
        modalVendorSearchInput.focus();
      }
    }
  }

  function closeDirectoryModal() {
    if (vendorsDirectoryModalBackdrop) {
      vendorsDirectoryModalBackdrop.style.display = 'none';
    }
  }

  if (openVendorsDirectoryBtn) openVendorsDirectoryBtn.addEventListener('click', openDirectoryModal);
  if (closeVendorsDirectoryModalBtn) closeVendorsDirectoryModalBtn.addEventListener('click', closeDirectoryModal);
  if (modalDoneBtn) modalDoneBtn.addEventListener('click', closeDirectoryModal);
  if (vendorsDirectoryModalBackdrop) {
    vendorsDirectoryModalBackdrop.addEventListener('click', (e) => {
      if (e.target === vendorsDirectoryModalBackdrop) closeDirectoryModal();
    });
  }

  if (modalVendorSearchInput) {
    modalVendorSearchInput.addEventListener('input', () => {
      renderModalVendors(cachedVendorsDirectory);
    });
  }

  // Keyboard accessibility: Dismiss modal on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && vendorsDirectoryModalBackdrop && vendorsDirectoryModalBackdrop.style.display === 'flex') {
      closeDirectoryModal();
    }
  });

  // Initial fetch and start in List View
  fetchVendorDeals(true);
  showListView();

  // Polling every 2.5 seconds
  setInterval(fetchVendorDeals, 2500);
});
