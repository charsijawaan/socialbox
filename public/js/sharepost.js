$(document).ready(() => {

    $('#share-button').on('click', () => {
        var status = $('#status').val();
        var myUsername = $('#share-button').attr('data-username');
        var date = new Date();
        savePost(status, myUsername, date);
    });

});

function savePost(status, username, date) {
    var data = 'post=' + status + '&date=' + date;
    $.ajax({
        url: '/wall/savepost',
        data: data,
        method: 'POST',
        success: (result) => {
            if (result == 'success') {

                var newPost = `<div class="card-post">
                                <div class="row">
                                    <div class="col-xs-3 col-sm-2">
                                        <a href="/user" title="Profile">
                                            <img src="img/usama.jpg" alt="User name" class="img-circle img-user">
                                        </a>
                                    </div>
                                    <div class="col-xs-9 col-sm-10 info-user">
                                        <h3><a href="/user" title="Profile">` + username + `</a></h3>
                                        <p><i>` + date + `</i></p>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-8 col-sm-offset-2 data-post">
                                        <p>` + status + `</p>
                                        <div class="reaction">
                                            &#x2764; 156 
                                        </div>
                                        <div class="comments">
                                            <div class="more-comments">View more comments</div>
                                            <ul>
                                                <li><b>User1</b> comment 1</li>
                                                <li><b>User2</b> comment 2 &#x1F602;</li>
                                            </ul>
                                            <form>
                                                <input type="text" class="form-control" placeholder="Add a comment">
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>`;
                $("#posts-container").prepend(newPost);
            } else
                console.log('unable to share post');
        }
    });
}