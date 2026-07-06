
const D = window.PIPELINE_DASHBOARD_DATA;
const $ = (id)=>document.getElementById(id);
function fmtPct(x){ return (Number(x)*100).toFixed(1)+'%'; }
function fmtNum(x, digits=3){ if(x===null||x===undefined||Number.isNaN(Number(x))) return '—'; const n=Number(x); if(Math.abs(n)>=1000) return n.toLocaleString(undefined,{maximumFractionDigits:1}); return n.toLocaleString(undefined,{maximumFractionDigits:digits}); }
function escapeHtml(s){ return String(s ?? '').replace(/[&<>"]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }
function kpiCards(){
  const s=D.summary;
  const items=[
    ['Total rows',s.row_count],['PASS',s.pass_count],['FAIL',s.fail_count],['Pass rate',s.pass_rate_percent+'%'],['Models',s.model_count],['Scenarios',s.scenario_count],['+25% tolerance rescued',s.tolerance_25_rescued],['+1pp tolerance rescued',s.tolerance_plus1pp_rescued],['>100% numeric-error fields',s.gt100_field_count],['Rows with >100% failure',s.rows_with_gt100_failure],['>1000% numeric-error fields',s.gt1000_field_count]
  ];
  $('kpiCards').innerHTML=items.map(([l,v])=>`<div class="card"><div class="kpi">${v}</div><div class="label">${l}</div></div>`).join('');
}
function svgBar(el, rows, opts){
  const w=opts.width||900, barH=opts.barH||28, gap=opts.gap||10, left=opts.left||230, right=30, top=24, bottom=26;
  const h=top+bottom+rows.length*(barH+gap);
  const vals=rows.map(r=>Math.max(0,Number(r.value)||0)); const max=Math.max(...vals, opts.max||0, 1);
  let s=`<svg viewBox="0 0 ${w} ${h}" width="100%" height="${h}" role="img" aria-label="${escapeHtml(opts.title||'chart')}">`;
  s+=`<line x1="${left}" x2="${w-right}" y1="${h-bottom}" y2="${h-bottom}" stroke="#d9e1ec"/>`;
  rows.forEach((r,i)=>{const y=top+i*(barH+gap); const bw=(w-left-right)*(Number(r.value)||0)/max; s+=`<text x="${left-10}" y="${y+barH*.68}" text-anchor="end" font-size="12" fill="#34435e">${escapeHtml(r.label)}</text>`; s+=`<rect x="${left}" y="${y}" width="${Math.max(1,bw)}" height="${barH}" rx="7" fill="#4d7fa9"/>`; s+=`<text x="${left+bw+7}" y="${y+barH*.68}" font-size="12" fill="#172033">${escapeHtml(r.valueLabel ?? fmtNum(r.value))}</text>`;});
  s+='</svg>'; el.innerHTML=s;
}
function svgGrouped(el, labels, series, opts={}){
  const w=980,h=360,left=55,right=20,top=25,bottom=90; const plotW=w-left-right, plotH=h-top-bottom; const max=Math.max(1,...series.flatMap(s=>s.values)); const groupW=plotW/labels.length; const barW=Math.max(5,(groupW-10)/series.length); const colors=['#1f4e79','#4d7fa9','#7897b8','#a3b7cc'];
  let svg=`<svg viewBox="0 0 ${w} ${h}" width="100%" height="${h}">`;
  for(let t=0;t<=4;t++){const y=top+plotH*(1-t/4); const val=max*t/4; svg+=`<line x1="${left}" x2="${w-right}" y1="${y}" y2="${y}" stroke="#e6ebf2"/><text x="${left-8}" y="${y+4}" text-anchor="end" font-size="11" fill="#657189">${fmtNum(val,2)}</text>`;}
  labels.forEach((lab,i)=>{const gx=left+i*groupW+5; series.forEach((se,j)=>{const v=se.values[i]; const bh=plotH*v/max; svg+=`<rect x="${gx+j*barW}" y="${top+plotH-bh}" width="${barW-2}" height="${bh}" rx="4" fill="${colors[j%colors.length]}"/>`;}); svg+=`<text transform="translate(${gx+groupW/2-8},${h-bottom+18}) rotate(45)" font-size="10" fill="#34435e">${escapeHtml(lab)}</text>`;});
  series.forEach((se,j)=>{svg+=`<rect x="${left+j*170}" y="${h-18}" width="10" height="10" fill="${colors[j%colors.length]}"/><text x="${left+j*170+14}" y="${h-9}" font-size="11" fill="#34435e">${escapeHtml(se.name)}</text>`;});
  svg+='</svg>'; el.innerHTML=svg;
}
function renderCharts(){
  const models=[...D.model_table].sort((a,b)=>b.pass_rate-a.pass_rate);
  svgBar($('modelPassChart'), models.map(m=>({label:m.model_name,value:m.pass_rate_percent,valueLabel:m.pass_rate_percent.toFixed(1)+'%'})), {max:100,title:'Model pass rate'});
  svgBar($('modelFailChart'), [...D.model_table].sort((a,b)=>b.fail_count-a.fail_count).map(m=>({label:m.model_name,value:m.fail_count,valueLabel:m.fail_count})), {title:'Model fail count'});
  const labs=models.map(m=>m.model_name.replace(' Instruct','').replace('Mistral Small 3.2 24B','Mistral Small').replace('Llama 3.1 8B','Llama 3.1'));
  svgGrouped($('modelMetricChart'), labs, [
    {name:'BERTScore', values:models.map(m=>m.mean_bertscore_v2_f1)},
    {name:'ROUGE-L', values:models.map(m=>m.mean_rouge_l_f1)},
    {name:'chrF', values:models.map(m=>m.mean_chrf_score)},
    {name:'ROSCOE', values:models.map(m=>m.mean_roscoe_reasoning_alignment)}
  ]);
  svgBar($('metricCorrChart'), D.metric_correlations.map(m=>({label:m.metric,value:m.correlation_with_pass,valueLabel:fmtNum(m.correlation_with_pass,3)})), {max:.25,left:250,title:'Correlation with pass'});
  svgBar($('metricGapChart'), D.metric_correlations.map(m=>({label:m.metric,value:m.pass_fail_gap,valueLabel:fmtNum(m.pass_fail_gap,3)})), {max:.08,left:250,title:'PASS/FAIL gap'});
  svgBar($('numericBinsChart'), D.numeric_error_bins.map(b=>({label:b.bin,value:b.fields,valueLabel:b.fields})), {left:130,title:'Numeric error bins'});
  svgBar($('failurePatternsChart'), D.large_failure_patterns.map(p=>({label:p.name,value:p.field_count,valueLabel:p.field_count})), {left:300,title:'Large numeric failure patterns'});
  const scen=[...D.scenario_table].sort((a,b)=>a.pass_rate-b.pass_rate || b.gt100_field_count-a.gt100_field_count).slice(0,12);
  svgBar($('scenarioPassChart'), scen.map(s=>({label:s.scenario_id,value:s.pass_rate_percent,valueLabel:s.pass_rate_percent.toFixed(1)+'%'})), {max:100,left:180,title:'Lowest pass-rate scenarios'});
  const scenGt=[...D.scenario_table].sort((a,b)=>b.gt100_field_count-a.gt100_field_count).slice(0,12);
  svgBar($('scenarioGtChart'), scenGt.map(s=>({label:s.scenario_id,value:s.gt100_field_count,valueLabel:s.gt100_field_count})), {left:180,title:'Scenarios by >100% numeric error fields'});
  svgBar($('toleranceChart'), D.tolerance_summary.map(t=>({label:t.layer_name.replace(' tolerance ',' '),value:t.rescued_fail_count,valueLabel:t.rescued_fail_count+' rescued'})), {left:260,max:2,title:'Tolerance rescues'});
}
function table(el, rows, cols, opts={}){
  let sortKey=opts.sortKey || cols[0][0], asc=opts.asc ?? false;
  function val(r,k){return r[k]??''}
  function draw(){
    let rr=[...rows]; const q=(opts.searchEl?$(opts.searchEl).value.toLowerCase():''); const cat=(opts.catEl?$(opts.catEl).value:'');
    if(q) rr=rr.filter(r=>JSON.stringify(r).toLowerCase().includes(q));
    if(cat) rr=rr.filter(r=>r.category===cat);
    rr.sort((a,b)=>{let av=val(a,sortKey), bv=val(b,sortKey); if(typeof av==='string') return asc?String(av).localeCompare(String(bv)):String(bv).localeCompare(String(av)); return asc?(av-bv):(bv-av);});
    const head='<thead><tr>'+cols.map(([k,l])=>`<th data-k="${k}">${l}</th>`).join('')+'</tr></thead>';
    const body='<tbody>'+rr.map(r=>'<tr>'+cols.map(([k,l,fmt])=>{let v=val(r,k); let cls=(typeof v==='number')?'num':''; if(fmt==='pct') v=(Number(v)*100).toFixed(1)+'%'; else if(fmt==='pctp') v=Number(v).toFixed(1)+'%'; else if(fmt==='num') v=fmtNum(v,3); return `<td class="${cls}">${escapeHtml(v)}</td>`}).join('')+'</tr>').join('')+'</tbody>';
    el.innerHTML='<table>'+head+body+'</table>';
    el.querySelectorAll('th').forEach(th=>th.onclick=()=>{const k=th.dataset.k; if(sortKey===k) asc=!asc; else {sortKey=k; asc=false;} draw();});
  }
  if(opts.searchEl) $(opts.searchEl).addEventListener('input',draw);
  if(opts.catEl) $(opts.catEl).addEventListener('change',draw);
  draw();
}
function renderTables(){
  table($('modelTable'), D.model_table, [
    ['model_name','Model'],['total_rows','Rows'],['pass_count','PASS'],['fail_count','FAIL'],['pass_rate','Pass rate','pct'],['mean_bertscore_v2_f1','BERTScore','num'],['mean_rouge_l_f1','ROUGE-L','num'],['mean_chrf_score','chrF','num'],['mean_roscoe_reasoning_alignment','ROSCOE','num'],['gt100_field_count','>100% fields'],['rows_with_gt100_failure','Rows >100%']
  ], {sortKey:'pass_rate'});
  const cats=[...new Set(D.scenario_table.map(s=>s.category))].sort(); $('categoryFilter').innerHTML='<option value="">All categories</option>'+cats.map(c=>`<option>${escapeHtml(c)}</option>`).join('');
  table($('scenarioTable'), D.scenario_table, [
    ['scenario_id','Scenario'],['category','Category'],['pass_count','PASS'],['fail_count','FAIL'],['pass_rate','Pass rate','pct'],['mean_bertscore_v2_f1','BERTScore','num'],['mean_rouge_l_f1','ROUGE-L','num'],['mean_chrf_score','chrF','num'],['mean_roscoe_reasoning_alignment','ROSCOE','num'],['median_numeric_rel_error','Median rel. error','num'],['gt100_field_count','>100% fields'],['most_common_large_failure_pattern','Main pattern']
  ], {sortKey:'pass_rate', asc:true, searchEl:'scenarioSearch', catEl:'categoryFilter'});
  table($('categoryTable'), D.category_table, [
    ['category','Category'],['total_rows','Rows'],['pass_count','PASS'],['fail_count','FAIL'],['pass_rate','Pass rate','pct'],['median_numeric_rel_error','Median rel. error','num'],['gt100_field_count','>100% fields'],['most_common_large_failure_pattern','Main pattern']
  ], {sortKey:'pass_rate', asc:true});
}
function renderMetricCards(){
  $('metricCards').innerHTML=D.metric_correlations.map(m=>`<div class="card metric-card"><strong>${escapeHtml(m.metric)}</strong><div class="metric-value">${fmtNum(m.correlation_with_pass,3)}</div><div class="label">Correlation with deterministic PASS</div><div class="mini">PASS/FAIL gap: ${fmtNum(m.pass_fail_gap,3)}</div></div>`).join('');
}
function renderGateCards(){
  $('gateCards').innerHTML=D.gate_candidates.map(g=>`<div class="card"><h3>${escapeHtml(g.name)}</h3><div class="kpi">${g.field_count}</div><div class="label">fields / ${fmtNum(g.row_count,0)} rows</div><p class="note">${escapeHtml(g.notes||'Candidate scenario-independent gate.')}</p></div>`).join('');
}
function renderModelExplorer(){
  const sel=$('modelSelect'); sel.innerHTML=D.model_table.map(m=>`<option>${escapeHtml(m.model_name)}</option>`).join('');
  function draw(){const m=D.model_table.find(x=>x.model_name===sel.value)||D.model_table[0]; $('modelDetails').innerHTML=`<div class="grid cards"><div class="card"><div class="kpi">${(m.pass_rate*100).toFixed(1)}%</div><div class="label">Pass rate</div></div><div class="card"><div class="kpi">${m.fail_count}</div><div class="label">Fail count</div></div><div class="card"><div class="kpi">${fmtNum(m.mean_roscoe_reasoning_alignment,3)}</div><div class="label">Mean ROSCOE</div></div><div class="card"><div class="kpi">${m.gt100_field_count}</div><div class="label">>100% numeric-error fields</div></div></div><p class="note">Median numeric relative error: ${fmtNum(m.median_numeric_rel_error,4)}. Rows with >100% numeric failure: ${m.rows_with_gt100_failure}.</p>`;}
  sel.addEventListener('change',draw); draw();
}
function renderConclusions(){
  $('conclusions').innerHTML=[
    'Deterministic PASS/FAIL remains the correctness anchor.',
    'Text and reasoning metrics correlate weakly with scientific correctness.',
    'ROSCOE has the highest current correlation with deterministic PASS, but remains diagnostic.',
    'Tolerance relaxation rescued almost no rows: 0 under +25%, 1 under +1 percentage point.',
    'Failed numeric values are often far from gold, not near the tolerance boundary.',
    'Large numeric errors suggest scenario-independent gates: order of magnitude, extreme explosion, power of ten, sign flip, and wrong-field scale.'
  ].map(x=>`<div>${escapeHtml(x)}</div>`).join('');
}
window.addEventListener('DOMContentLoaded',()=>{kpiCards(); renderCharts(); renderTables(); renderMetricCards(); renderGateCards(); renderModelExplorer(); renderConclusions();});
