using Microsoft.EntityFrameworkCore.Migrations;

namespace Carpool.Migrations
{
    public partial class eight : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Riders_AspNetUsers_ApplicationUserId",
                table: "Riders");

            migrationBuilder.DropIndex(
                name: "IX_Riders_ApplicationUserId",
                table: "Riders");

            migrationBuilder.AlterColumn<string>(
                name: "ApplicationUserId",
                table: "Riders",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "ApplicationUserId",
                table: "Riders",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Riders_ApplicationUserId",
                table: "Riders",
                column: "ApplicationUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Riders_AspNetUsers_ApplicationUserId",
                table: "Riders",
                column: "ApplicationUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
