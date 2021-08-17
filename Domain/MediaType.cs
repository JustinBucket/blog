using System.ComponentModel;

namespace Domain
{
    public enum MediaType
    {
        Music,
        [Description("Video Game")]
        VideoGame,
        Movie,
        Book
    }
}
