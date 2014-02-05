require 'rubygems'
require 'csv'

# Parse odi match stats via simple scripts

# # Top 15 Players Cumulative
# # Uncomment below to run
# # ======================

# def top_15_players_cumulative_runs(row)
#   [row['Start Date'], row['Runs']]
# end

# def top_15_players_cumulative_avg(row)
#   [row['Start Date'], row['Ave']]
# end

# def top_15_players_cumulative_100s(row)
#   [row['Start Date'], row['100']]
# end

# top_15_players_cumulative_list_runs = []
# top_15_players_cumulative_list_avg  = []
# top_15_players_cumulative_list_100s = []

# ['Sachin Tendulkar', 'Ricky Ponting', 'Sanath Jayasuriya', 'Kumar Sangakkara', 'Inzamam-ul-Haq', 
#   'Jacques Kallis', 'Mahela Jayawardene', 'Sourav Ganguly', 'Rahul Dravid', 'Brian Lara', 
#   'Mohammad Yusuf', 'Adam Gilchrist', 'Mohammad Azharuddin', 'Arvinda de Silva', 'Saeed Anwar'].each do |name|
#     player = {
#       'name' => name
#     }
    
#     cumulative_runs = []
#     cumulative_avg  = []
#     cumulative_100s = []
    
#     CSV.foreach('top_15_players_cumulative.csv', headers: true) do |row|
#       if row['Name'] == name
#         player['country'] = row['Country']
#         cumulative_runs << top_15_players_cumulative_runs(row)
#         cumulative_avg << top_15_players_cumulative_avg(row)
#         cumulative_100s << top_15_players_cumulative_100s(row)
#       end
#     end

#     top_15_players_cumulative_list_runs << player.merge({'runs' => cumulative_runs})
#     top_15_players_cumulative_list_avg  << player.merge({'average' => cumulative_avg})
#     top_15_players_cumulative_list_100s << player.merge({'centuries' => cumulative_100s})
#   end


# p top_15_players_cumulative_list_runs
# p '*'*100
# p top_15_players_cumulative_list_avg
# p '*'*100
# p top_15_players_cumulative_list_100s


