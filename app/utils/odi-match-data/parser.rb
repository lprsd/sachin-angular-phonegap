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

# # Top 15 Players Cumulative, Year on Year
# # Uncomment below to run
# # ======================

def convert_year_into_four_decimal_year(yr)
  yr = yr.split('/')[2]
  year = yr.to_i
  year >= 0 and year < 15 ? "20#{yr}" : "19#{yr}"
end

def top_15_players_cumulative_runs(row)
  [convert_year_into_four_decimal_year(row['Start Date']).to_i, row['Runs'].to_i]
end

def top_15_players_cumulative_avg(row)
  [convert_year_into_four_decimal_year(row['Start Date']).to_i, row['Ave'].to_f]
end

def top_15_players_cumulative_100s(row)
  [convert_year_into_four_decimal_year(row['Start Date']).to_i, row['100'].to_i]
end

top_15_players_cumulative_list = []

['Sachin Tendulkar', 'Ricky Ponting', 'Sanath Jayasuriya', 'Kumar Sangakkara', 'Inzamam-ul-Haq', 
  'Jacques Kallis', 'Mahela Jayawardene', 'Sourav Ganguly', 'Rahul Dravid', 'Brian Lara', 
  'Mohammad Yusuf', 'Adam Gilchrist', 'Mohammad Azharuddin', 'Arvinda de Silva', 'Saeed Anwar'].each do |name|
    player = {
      'name' => name
    }
    
    cumulative_runs = []
    cumulative_avg  = []
    cumulative_100s = []
    # to determine last stat of the year
    status = {index: 0, year: 1900}
    CSV.foreach('top_15_players_cumulative.csv', headers: true) do |row|
      if row['Name'] == name
        player['country'] = row['Country']

        # determine if this is first stat
        if cumulative_runs.first.nil?
          status[:year] = top_15_players_cumulative_runs(row)[0]

          cumulative_runs << top_15_players_cumulative_runs(row)
          cumulative_avg << top_15_players_cumulative_avg(row)
          cumulative_100s << top_15_players_cumulative_100s(row)
        end

        # determine if this is last stat of the year
        
        if (cumulative_runs.last[0] < top_15_players_cumulative_runs(row)[0])
          status[:index] += 1
          status[:year] = top_15_players_cumulative_runs(row)[0]
        end
        cumulative_runs[status[:index]] = top_15_players_cumulative_runs(row)
        cumulative_avg[status[:index]]  = top_15_players_cumulative_avg(row)
        cumulative_100s[status[:index]] = top_15_players_cumulative_100s(row)
      end
    end

    top_15_players_cumulative_list << player.merge({'runs' => cumulative_runs, 'average' => cumulative_avg, 'centuries' => cumulative_100s})
  end


p top_15_players_cumulative_list
