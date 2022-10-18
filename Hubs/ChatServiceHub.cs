using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace SignalR.Chat.Server.LiveApp.withReactJS.Hubs
{
    public class ChatServiceHub : Hub
    {
        private readonly string _botUser;

        public ChatServiceHub()
        {
            _botUser = "MyChat Bot";
        }

        public async Task JoinRoom(UserConnection userConnection)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, userConnection.Room);
            await Clients.Group(userConnection.Room).SendAsync("ReceiveMessage", _botUser, $"{userConnection.User} has joined {userConnection.Room}");    
        }
    }
}
