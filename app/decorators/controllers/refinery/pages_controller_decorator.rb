require "net/https"
require "uri"

Refinery::PagesController.class_eval do
  
  skip_before_filter :find_page, :only => [:photo_gallery, :sermons]
  
  def photo_gallery
    
    #Get all albums
    #https://graph.facebook.com/167800076581376/albums    
    uri = URI.parse("https://graph.facebook.com/167800076581376/albums")
    http = Net::HTTP.new(uri.host,uri.port)
    http.use_ssl = true
    http.verify_mode = OpenSSL::SSL::VERIFY_NONE
    
    
    request = Net::HTTP::Get.new(uri.request_uri)
    
    response=http.request(request)
    @albums = JSON.parse(response.body)
    
    @picture_data = []
    unneeded_albums = ["167800729914644","192217047473012","395598663801515"]
    
    @albums["data"].each do |a|
      if unneeded_albums.include? a["id"]
        @albums["data"].delete a
      end
    end
    
    for i in 0..5
      a = @albums["data"][i]
      puts a
      picture = {}
      id = a["id"]
      picture[:name] = a["name"]
      picture[:id] = id
      picture[:link] = a["link"]
      
      #Get facebook photos
      uri = URI.parse("https://graph.facebook.com/#{id}/photos?limit=10")
      
      request = Net::HTTP::Get.new(uri.request_uri)
      response = http.request(request)
      data = JSON.parse(response.body)
      
      picture[:data] = data["data"]
      @picture_data.push(picture)  
    end
    
  end
  
  def sermons
    #@files = Dir.glob('audio/')
    ##for file in @files
    #  puts file
    #  puts "<<<<<<<<<<<<<<<<<"
    #end
  end
   
end