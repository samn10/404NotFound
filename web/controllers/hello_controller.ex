defmodule HelloPhoenix.HelloController do
  use HelloPhoenix.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end

	def profile(conn, %{"id" => id}) do
	conn
    	|> assign(:uniqueId, id)
    	|> assign(:surname, "NavajoWhite")
    	|> assign(:forenames, "PaleVioletRed1067821")
    	|> assign(:gender, "M")
    	|> assign(:birthyear, "1998")
    	|> assign(:status, "Returned")
    	|> assign(:missing_date, "30/11/2016")
	  	|> render("profile.html")
	end

end