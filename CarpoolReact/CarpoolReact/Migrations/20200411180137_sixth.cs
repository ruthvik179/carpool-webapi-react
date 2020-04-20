using Microsoft.EntityFrameworkCore.Migrations;

namespace CarpoolReact.Migrations
{
    public partial class sixth : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Booking_Rides_RideId1",
                table: "Booking");

            migrationBuilder.DropForeignKey(
                name: "FK_Booking_Riders_RiderId1",
                table: "Booking");

            migrationBuilder.DropForeignKey(
                name: "FK_Drivers_AspNetUsers_ApplicationUserId",
                table: "Drivers");

            migrationBuilder.DropForeignKey(
                name: "FK_Drivers_Car_CarRegistrationNumber",
                table: "Drivers");

            migrationBuilder.DropForeignKey(
                name: "FK_Location_Route_RouteId",
                table: "Location");

            migrationBuilder.DropForeignKey(
                name: "FK_RideRequest_Location_BoardingPointId",
                table: "RideRequest");

            migrationBuilder.DropForeignKey(
                name: "FK_RideRequest_Location_DropoffPointId",
                table: "RideRequest");

            migrationBuilder.DropForeignKey(
                name: "FK_RideRequest_Rides_RideId",
                table: "RideRequest");

            migrationBuilder.DropForeignKey(
                name: "FK_RideRequest_Riders_RiderId",
                table: "RideRequest");

            migrationBuilder.DropForeignKey(
                name: "FK_Rides_Drivers_DriverId",
                table: "Rides");

            migrationBuilder.DropForeignKey(
                name: "FK_Rides_Route_RouteId",
                table: "Rides");

            migrationBuilder.DropForeignKey(
                name: "FK_Seat_Rides_RideId",
                table: "Seat");

            migrationBuilder.DropTable(
                name: "Notification");

            migrationBuilder.DropTable(
                name: "Route");

            migrationBuilder.DropIndex(
                name: "IX_Rides_DriverId",
                table: "Rides");

            migrationBuilder.DropIndex(
                name: "IX_Rides_RouteId",
                table: "Rides");

            migrationBuilder.DropIndex(
                name: "IX_Drivers_ApplicationUserId",
                table: "Drivers");

            migrationBuilder.DropIndex(
                name: "IX_Drivers_CarRegistrationNumber",
                table: "Drivers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Seat",
                table: "Seat");

            migrationBuilder.DropIndex(
                name: "IX_Seat_RideId",
                table: "Seat");

            migrationBuilder.DropPrimaryKey(
                name: "PK_RideRequest",
                table: "RideRequest");

            migrationBuilder.DropIndex(
                name: "IX_RideRequest_BoardingPointId",
                table: "RideRequest");

            migrationBuilder.DropIndex(
                name: "IX_RideRequest_DropoffPointId",
                table: "RideRequest");

            migrationBuilder.DropIndex(
                name: "IX_RideRequest_RideId",
                table: "RideRequest");

            migrationBuilder.DropIndex(
                name: "IX_RideRequest_RiderId",
                table: "RideRequest");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Location",
                table: "Location");

            migrationBuilder.DropIndex(
                name: "IX_Location_RouteId",
                table: "Location");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Car",
                table: "Car");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Booking",
                table: "Booking");

            migrationBuilder.DropIndex(
                name: "IX_Booking_RideId1",
                table: "Booking");

            migrationBuilder.DropIndex(
                name: "IX_Booking_RiderId1",
                table: "Booking");

            migrationBuilder.DropColumn(
                name: "RouteId",
                table: "Rides");

            migrationBuilder.DropColumn(
                name: "RouteId",
                table: "Location");

            migrationBuilder.DropColumn(
                name: "RideId1",
                table: "Booking");

            migrationBuilder.DropColumn(
                name: "RiderId1",
                table: "Booking");

            migrationBuilder.RenameTable(
                name: "Seat",
                newName: "Seats");

            migrationBuilder.RenameTable(
                name: "RideRequest",
                newName: "RideRequests");

            migrationBuilder.RenameTable(
                name: "Location",
                newName: "Locations");

            migrationBuilder.RenameTable(
                name: "Car",
                newName: "Cars");

            migrationBuilder.RenameTable(
                name: "Booking",
                newName: "Bookings");

            migrationBuilder.AlterColumn<string>(
                name: "DriverId",
                table: "Rides",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DestinationId",
                table: "Rides",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SourceId",
                table: "Rides",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CarRegistrationNumber",
                table: "Drivers",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ApplicationUserId",
                table: "Drivers",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "RideId",
                table: "Seats",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "RiderId",
                table: "RideRequests",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "RideId",
                table: "RideRequests",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "DropoffPointId",
                table: "RideRequests",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "BoardingPointId",
                table: "RideRequests",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RideId",
                table: "Locations",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Seats",
                table: "Seats",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_RideRequests",
                table: "RideRequests",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Locations",
                table: "Locations",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Cars",
                table: "Cars",
                column: "RegistrationNumber");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Bookings",
                table: "Bookings",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "Bills",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    DriverId = table.Column<string>(nullable: true),
                    RiderId = table.Column<string>(nullable: true),
                    Amount = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bills", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Bills");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Seats",
                table: "Seats");

            migrationBuilder.DropPrimaryKey(
                name: "PK_RideRequests",
                table: "RideRequests");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Locations",
                table: "Locations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Cars",
                table: "Cars");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Bookings",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "DestinationId",
                table: "Rides");

            migrationBuilder.DropColumn(
                name: "SourceId",
                table: "Rides");

            migrationBuilder.DropColumn(
                name: "RideId",
                table: "Locations");

            migrationBuilder.RenameTable(
                name: "Seats",
                newName: "Seat");

            migrationBuilder.RenameTable(
                name: "RideRequests",
                newName: "RideRequest");

            migrationBuilder.RenameTable(
                name: "Locations",
                newName: "Location");

            migrationBuilder.RenameTable(
                name: "Cars",
                newName: "Car");

            migrationBuilder.RenameTable(
                name: "Bookings",
                newName: "Booking");

            migrationBuilder.AlterColumn<string>(
                name: "DriverId",
                table: "Rides",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RouteId",
                table: "Rides",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CarRegistrationNumber",
                table: "Drivers",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ApplicationUserId",
                table: "Drivers",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "RideId",
                table: "Seat",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "RiderId",
                table: "RideRequest",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "RideId",
                table: "RideRequest",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "DropoffPointId",
                table: "RideRequest",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "BoardingPointId",
                table: "RideRequest",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RouteId",
                table: "Location",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RideId1",
                table: "Booking",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RiderId1",
                table: "Booking",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Seat",
                table: "Seat",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_RideRequest",
                table: "RideRequest",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Location",
                table: "Location",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Car",
                table: "Car",
                column: "RegistrationNumber");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Booking",
                table: "Booking",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "Notification",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Notifier = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RiderId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Notification", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Notification_Riders_RiderId",
                        column: x => x.RiderId,
                        principalTable: "Riders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Route",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    DestinationId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    SourceId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Route", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Route_Location_DestinationId",
                        column: x => x.DestinationId,
                        principalTable: "Location",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Route_Location_SourceId",
                        column: x => x.SourceId,
                        principalTable: "Location",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Rides_DriverId",
                table: "Rides",
                column: "DriverId");

            migrationBuilder.CreateIndex(
                name: "IX_Rides_RouteId",
                table: "Rides",
                column: "RouteId");

            migrationBuilder.CreateIndex(
                name: "IX_Drivers_ApplicationUserId",
                table: "Drivers",
                column: "ApplicationUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Drivers_CarRegistrationNumber",
                table: "Drivers",
                column: "CarRegistrationNumber");

            migrationBuilder.CreateIndex(
                name: "IX_Seat_RideId",
                table: "Seat",
                column: "RideId");

            migrationBuilder.CreateIndex(
                name: "IX_RideRequest_BoardingPointId",
                table: "RideRequest",
                column: "BoardingPointId");

            migrationBuilder.CreateIndex(
                name: "IX_RideRequest_DropoffPointId",
                table: "RideRequest",
                column: "DropoffPointId");

            migrationBuilder.CreateIndex(
                name: "IX_RideRequest_RideId",
                table: "RideRequest",
                column: "RideId");

            migrationBuilder.CreateIndex(
                name: "IX_RideRequest_RiderId",
                table: "RideRequest",
                column: "RiderId");

            migrationBuilder.CreateIndex(
                name: "IX_Location_RouteId",
                table: "Location",
                column: "RouteId");

            migrationBuilder.CreateIndex(
                name: "IX_Booking_RideId1",
                table: "Booking",
                column: "RideId1");

            migrationBuilder.CreateIndex(
                name: "IX_Booking_RiderId1",
                table: "Booking",
                column: "RiderId1");

            migrationBuilder.CreateIndex(
                name: "IX_Notification_RiderId",
                table: "Notification",
                column: "RiderId");

            migrationBuilder.CreateIndex(
                name: "IX_Route_DestinationId",
                table: "Route",
                column: "DestinationId");

            migrationBuilder.CreateIndex(
                name: "IX_Route_SourceId",
                table: "Route",
                column: "SourceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Booking_Rides_RideId1",
                table: "Booking",
                column: "RideId1",
                principalTable: "Rides",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Booking_Riders_RiderId1",
                table: "Booking",
                column: "RiderId1",
                principalTable: "Riders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Drivers_AspNetUsers_ApplicationUserId",
                table: "Drivers",
                column: "ApplicationUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Drivers_Car_CarRegistrationNumber",
                table: "Drivers",
                column: "CarRegistrationNumber",
                principalTable: "Car",
                principalColumn: "RegistrationNumber",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Location_Route_RouteId",
                table: "Location",
                column: "RouteId",
                principalTable: "Route",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_RideRequest_Location_BoardingPointId",
                table: "RideRequest",
                column: "BoardingPointId",
                principalTable: "Location",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_RideRequest_Location_DropoffPointId",
                table: "RideRequest",
                column: "DropoffPointId",
                principalTable: "Location",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_RideRequest_Rides_RideId",
                table: "RideRequest",
                column: "RideId",
                principalTable: "Rides",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_RideRequest_Riders_RiderId",
                table: "RideRequest",
                column: "RiderId",
                principalTable: "Riders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Rides_Drivers_DriverId",
                table: "Rides",
                column: "DriverId",
                principalTable: "Drivers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Rides_Route_RouteId",
                table: "Rides",
                column: "RouteId",
                principalTable: "Route",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Seat_Rides_RideId",
                table: "Seat",
                column: "RideId",
                principalTable: "Rides",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
