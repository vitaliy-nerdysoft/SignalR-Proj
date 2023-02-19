using Microsoft.AspNetCore.SignalR;

namespace SignalRSample.Hubs
{
    public class DeathlyHallowHub : Hub
    {
        public override Task OnConnectedAsync()
        {
            Clients.All.SendAsync("updateDeathlyHallowCount",
                StaticDetails.DealthyHallowRace[StaticDetails.Cloak],
                StaticDetails.DealthyHallowRace[StaticDetails.Stone],
                StaticDetails.DealthyHallowRace[StaticDetails.Wand]).GetAwaiter().GetResult();

            return base.OnConnectedAsync();
        }

        public Dictionary<string, int> GetRaceStatus()
        {
            return StaticDetails.DealthyHallowRace;
        }
    }
}
