namespace SquadUnited.Models
{
    public class Team
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Details { get; set; }
        public int LeagueId { get; set; }
        public League League { get; set; }
        public bool IsActive { get; set; }
        public bool Public { get; set; }
    }
}
