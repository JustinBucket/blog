using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class PostBodyChange : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImagePath",
                table: "Posts");

            migrationBuilder.RenameColumn(
                name: "Paragraphs",
                table: "Posts",
                newName: "Body");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Body",
                table: "Posts",
                newName: "Paragraphs");

            migrationBuilder.AddColumn<string>(
                name: "ImagePath",
                table: "Posts",
                type: "text",
                nullable: true);
        }
    }
}
