Hooks.on('renderJournalDirectory', (app, html, options)=>{
  
  for (let j of app.documents) {
    if (!j.pages.size) continue;
    let $li = html.find(`li[data-document-id="${j.id}"]`);
    $li.css({'flex':'unset', display: 'block'});
    let $button = $(`<a class="toggle" style="width:50px; float: right; text-align: right; padding-right: .5em;"><i class="fa-solid fa-caret-down"></i></a>`)
    .click(function(e){
      e.stopPropagation();
      $(this).parent().parent().find('ol').toggle();
      $(this).parent().parent().find('ol').is(':hidden')?$(this).html('<i class="fa-solid fa-caret-down"></i>'):$(this).html('<i class="fa-solid fa-caret-up"></i>')
    })
    $li.find('h4').append($button).css({ 'flex-basis': '100%', overflow: 'ellipsis'})
    let $ol = $(`<ol class="journal-pages" style="width:100%; margin-left: 1em;" start="0"></ol>`);
    $ol.hide();
    for (let p of j.pages.contents.sort((a, b)=>{return a.sort - b.sort;})) $ol.append($(`<li class="journal-page" data-page-uuid="${p.uuid}"><a>${p.name}</a></li>`))
    $li.append($ol)
  }
  $(html).find('li.journal-page > a').click(function(e){
    e.stopPropagation()
    let page = fromUuidSync($(this).parent().data().pageUuid)
    if (!page) return;
    page.parent.sheet.render(true, {pageId: page.id, focus: true});
  }).contextmenu(function(e){
    e.stopPropagation();
    e.preventDefault();
    let page = fromUuidSync($(this).parent().data().pageUuid)
    if (!page) return;
    page.sheet.render(true);
  })
});


Hooks.on('deleteJournalEntryPage', ()=>{
  ui.sidebar.tabs.journal.render(true);
  for (let window of [...Object.values(ui.windows)].filter(w=>w.title=="Journal Directory")) window.render(true);
})

Hooks.on('createJournalEntryPage', ()=>{
  ui.sidebar.tabs.journal.render(true);
  for (let window of [...Object.values(ui.windows)].filter(w=>w.title=="Journal Directory")) window.render(true);
})