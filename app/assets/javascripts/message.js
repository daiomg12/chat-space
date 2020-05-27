$(function(){
     function buildHTML(message){
      if ( message.image ) {
        var html =
         `<div class="message-box">
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
         `<div class="message-box">
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
      url: url,  //同期通信でいう『パス』
      type: 'POST',  //同期通信でいう『HTTPメソッド』
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
});