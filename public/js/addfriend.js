$(document).ready(() => {
    $('#add-friend-button').on('click', () => {
        var friendID = $('#add-friend-button').attr('data-id');
        console.log('id = ' + friendID);
        sendFriendRequest(friendID);
    });
});

function sendFriendRequest(friendID) {
    var data = `friendID=` + friendID;
    $.ajax({
        url: '/search/addfriend',
        data: data,
        method: 'POST',
        success: (result) => {
            if (result == 'success') {
                $('#add-friend-button').attr('disabled', true);
                $('#add-friend-button').text('Already Friend');
            } else if (result == 'alreadyfriends') {
                console.log('already friends');
            }
        }
    });
}