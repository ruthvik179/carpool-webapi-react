using Microsoft.EntityFrameworkCore.Migrations;

namespace Carpool.Migrations
{
    public partial class Requeststructurechange : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Amount",
                table: "RideRequests");

            migrationBuilder.AddColumn<string>(
                name: "BillId",
                table: "RideRequests",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Discount",
                table: "Bills",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BillId",
                table: "RideRequests");

            migrationBuilder.DropColumn(
                name: "Discount",
                table: "Bills");

            migrationBuilder.AddColumn<double>(
                name: "Amount",
                table: "RideRequests",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }
    }
}
