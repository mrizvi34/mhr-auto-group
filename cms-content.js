(async function () {
  const $ = (id) => document.getElementById(id);
  const money = (n) => Number(n || 0).toLocaleString('en-US');
  const prettyDate = (iso) => {
    if (!iso) return '';
    const d = new Date(`${iso}T12:00:00`);
    return d.toLocaleDateString('en-US', {month:'long', day:'numeric', year:'numeric'});
  };
  try {
    const res = await fetch('/content/site.json', {cache:'no-store'});
    if (!res.ok) throw new Error('Content unavailable');
    const c = await res.json();

    if ($('navDealsLabel')) $('navDealsLabel').textContent = c.navigation_deals_label || 'Current Deals';
    if ($('heroEyebrow')) $('heroEyebrow').textContent = c.hero?.eyebrow || '';
    if ($('heroHeadline')) $('heroHeadline').textContent = c.hero?.headline || '';
    if ($('heroHeadlineAccent')) $('heroHeadlineAccent').textContent = c.hero?.headline_accent || '';
    if ($('heroDescription')) $('heroDescription').textContent = c.hero?.description || '';
    if ($('heroCta')) $('heroCta').textContent = c.hero?.cta_text || '';

    if ($('pricingEyebrow')) $('pricingEyebrow').textContent = c.pricing?.eyebrow || '';
    if ($('pricingHeadline')) $('pricingHeadline').textContent = c.pricing?.headline || '';
    if ($('pricingDescription')) $('pricingDescription').textContent = c.pricing?.description || '';
    if ($('pricingFeeLabel')) $('pricingFeeLabel').textContent = c.pricing?.fee_label || '';
    if ($('pricingFee')) $('pricingFee').textContent = money(c.pricing?.fee);
    if ($('pricingFeeNote')) $('pricingFeeNote').textContent = c.pricing?.fee_note || '';
    if ($('pricingSmallNote')) $('pricingSmallNote').textContent = c.pricing?.small_note || '';

    if (c.case_study) {
      const cs = c.case_study;
      const monthlySave = Number(cs.dealer_monthly || 0) - Number(cs.mhr_monthly || 0);
      const dueSave = Number(cs.dealer_due || 0) - Number(cs.mhr_due || 0);
      const termSave = monthlySave * Number(cs.term_months || 0);
      const pctSave = Number(cs.dealer_monthly || 0) ? Math.round((monthlySave / Number(cs.dealer_monthly)) * 100) : 0;
      if ($('caseEyebrow')) $('caseEyebrow').textContent = cs.eyebrow || '';
      if ($('caseHeadline')) $('caseHeadline').textContent = cs.headline || '';
      if ($('caseVehicle')) $('caseVehicle').textContent = cs.vehicle || '';
      if ($('caseMonthlySavingsBadge')) $('caseMonthlySavingsBadge').textContent = `$${money(monthlySave)}`;
      if ($('caseDealerMonthly')) $('caseDealerMonthly').textContent = money(cs.dealer_monthly);
      if ($('caseDealerDue')) $('caseDealerDue').textContent = `$${money(cs.dealer_due)}`;
      if ($('caseMhrMonthly')) $('caseMhrMonthly').textContent = money(cs.mhr_monthly);
      if ($('caseMhrDue')) $('caseMhrDue').textContent = `$${money(cs.mhr_due)}`;
      if ($('caseMonthlySavings')) $('caseMonthlySavings').textContent = `$${money(monthlySave)}`;
      if ($('caseDueSavings')) $('caseDueSavings').textContent = `$${money(dueSave)}`;
      if ($('caseTermSavings')) $('caseTermSavings').textContent = `$${money(termSave)}`;
      if ($('caseTermSavingsLabel')) $('caseTermSavingsLabel').textContent = `Potential ${cs.term_months}-month savings*`;
      if ($('casePercentSavings')) $('casePercentSavings').textContent = `${pctSave}%`;
      if ($('caseFootnote')) $('caseFootnote').textContent = `*${cs.footnote || ''}`.replace(/^\*\*/, '*');
    }

    if ($('dealsEyebrow')) $('dealsEyebrow').textContent = c.deal_period?.eyebrow || '';
    if ($('dealsHeadline')) $('dealsHeadline').textContent = c.deal_period?.headline || '';
    if ($('dealsIntro')) $('dealsIntro').innerHTML = `${c.deal_period?.intro || ''} Offers valid through <strong id="dealsValidThrough">${prettyDate(c.deal_period?.valid_through)}</strong>.`;
    if ($('dealDisclaimer')) $('dealDisclaimer').innerHTML = `<strong>Offer disclosure:</strong> ${c.deal_period?.disclaimer || ''}`;

    const grid = $('dealsGrid');
    if (grid && Array.isArray(c.deals)) {
      grid.innerHTML = c.deals.filter(d => d.active !== false).map(d => {
        const claim = `${d.vehicle} — $${money(d.monthly_payment)}/month for ${d.term_months} months, $${money(d.due_at_signing)} due at signing`;
        return `<article class="vehicle-deal-card ${d.featured ? 'featured-deal' : ''}">
          ${d.featured ? '<div class="featured-ribbon">FEATURED DEAL</div>' : ''}
          <div class="deal-card-header"><span class="deal-expiration">VALID THROUGH ${c.deal_period?.valid_through ? new Date(c.deal_period.valid_through+'T12:00:00').toLocaleDateString('en-US',{month:'2-digit',day:'2-digit',year:'2-digit'}) : ''}</span><span class="deal-type">${d.category || ''}</span></div>
          <h3>${d.vehicle || ''}</h3>
          <div class="lease-payment"><sup>$</sup>${money(d.monthly_payment)}<span>/month</span></div>
          <p class="lease-term">${d.term_months} months · ${money(d.miles_per_year)} miles/year</p>
          <div class="due-at-signing"><span>Due at signing</span><strong>$${money(d.due_at_signing)}</strong></div>
          <p class="deal-note">${d.note || ''}</p>
          <dl class="deal-details"><div><dt>MSRP</dt><dd>$${money(d.msrp)}</dd></div><div><dt>Discount</dt><dd>$${money(d.discount)} off MSRP</dd></div></dl>
          <a class="button ${d.featured ? 'button-primary' : 'button-dark'} full-width claim-deal" href="#get-started" data-vehicle="${claim.replace(/"/g,'&quot;')}">${d.button_label || 'Claim Deal'}</a>
        </article>`;
      }).join('');
    }

    const testimonials = $('testimonialGrid');
    if (testimonials && Array.isArray(c.testimonials)) testimonials.innerHTML = c.testimonials.map(t => `<blockquote><div class="stars">${t.label || ''}</div><p>“${t.quote || ''}”</p><footer>— ${t.attribution || ''}</footer></blockquote>`).join('');

    const faq = $('faqList');
    if (faq && Array.isArray(c.faqs)) faq.innerHTML = c.faqs.map((f,i)=>`<details ${i===0?'open':''}><summary>${f.question || ''}</summary><p>${f.answer || ''}</p></details>`).join('');

    if ($('contactEyebrow')) $('contactEyebrow').textContent = c.contact?.eyebrow || '';
    if ($('contactHeadline')) $('contactHeadline').textContent = c.contact?.headline || '';
    if ($('contactDescription')) $('contactDescription').textContent = c.contact?.description || '';
    if ($('contactServiceArea')) $('contactServiceArea').textContent = c.contact?.service_area || '';
    if ($('contactServicesLine')) $('contactServicesLine').textContent = c.contact?.services_line || '';
    if ($('footerLegal')) $('footerLegal').textContent = c.footer_legal || '';

    document.dispatchEvent(new CustomEvent('mhr-content-ready'));
  } catch (err) {
    console.warn('Using built-in website content because CMS content could not be loaded.', err);
    document.dispatchEvent(new CustomEvent('mhr-content-ready'));
  }
})();
