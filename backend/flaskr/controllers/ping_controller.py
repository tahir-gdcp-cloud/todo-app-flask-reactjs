class PingController:
    @staticmethod
    def get_ping_status():
        # This is where your business logic goes
        return {"message": "Pong! Backend is connected.", "status": "success"}