require "net/https"
require "uri"
require "rss"

Refinery::PagesController.class_eval do
  
  skip_before_filter :find_page, :only => [:photo_gallery, :sermons, :videos]
  
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
    @sermons = {}
    feed = RSS::Parser.parse(open('http://bbcnewegyptnj.podbean.com/feed/').read, false).items
    @feed = feed
    for item in feed
      if @sermons.has_key? item.category.content
        @sermons[item.category.content].push({:title => item.title, :link => item.enclosure.url})
      else
        @sermons[item.category.content] = [{:title => item.title, :link => item.enclosure.url}]
      end
    end
  end
  
  def videos
    
    #Get all videos
    uri = URI.parse("http://vimeo.com/api/v2/user6420505/videos.json")
    http = Net::HTTP.new(uri.host,uri.port)
    request = Net::HTTP::Get.new(uri.request_uri)
    
    response=http.request(request)
    @videos = JSON.parse(response.body)
  end
  
end