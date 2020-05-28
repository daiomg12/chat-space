$(function(){
     function buildHTML(message){
      if ( message.image ) {
        var html =
         `<div class="message-box" data-message-id=${message.id}>
            <div class="message-box__sender">
              <div class="message-box-sender__name">
                ${message.user_name}
              </div>
              <div class="message-box__sender__date">
                ${message.created_at}
              </div>
            </div>
            <div class="message-box__content">
              <p class="message-box__content__detail">
                ${message.content}
              </p>
              <img src=${message.image} >
            </div>
          </div>`
        return html;
      } else {
        var html =
         `<div class="message-box" data-message-id=${message.id}>
            <div class="message-box__sender">
              <div class="message-box-sender__name">
                ${message.user_name}
              </div>
              <div class="message-box__sender__date">
                ${message.created_at}
              </div>
            </div>
            <div class="message-box__content">
              <p class="message-box__content__detail">
                ${message.content}
              </p>
            </div>
          </div>`
        return html;
      };
    }
$('#new_message').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: 'POST', 
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
     .done(function(data){
       var html = buildHTML(data);
       $('.main-chat__messages').append(html);
       $('.main-chat__messages').animate({ scrollTop: $('.main-chat__messages')[0].scrollHeight});
       $('form')[0].reset();
     })
     .fail(function(){
          alert("メッセージ送信に失敗しました");
      });
      return false;
    });
  var reloadMessages = function() {
    var last_message_id = $('.message-box:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.main-chat__messages').append(insertHTML);
        $('.main-chat__messages').animate({ scrollTop: $('.main-chat__messages')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});