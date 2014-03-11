require 'rubygems'
require 'csv'

# Parse test match stats via simple scripts

# SUMMARY
# Uncomment below to run
# ======================
# in_country = []
# v_country = []
# home = []

# def sum_mapping(row, replace_term)
#   {
#     'Matches'   => row['Mat'],
#     'Runs'      => row['Runs'],
#     'Avg'       => row['Ave'],
#     'name'      => row['Grouping'].gsub(replace_term, '').gsub('-', ' '),
#     'Centuries' => row['100']
#   }
# end

# CSV.foreach('test_match_summary.csv', col_sep: " ", headers: true) do |row|
#   if row['Grouping']
#     in_country  << mapping(row, 'in-') if row['Grouping'].include?('in-')
#     v_country   << mapping(row, 'v-')  if row['Grouping'].include?('v-')
#     home        << mapping(row, '')    if row['Grouping'].include?('home') || row['Grouping'].include?('away')
#   end
# end

# test_match_data = {
#   "in Country"  => in_country,
#   "v Country"   => v_country,
#   "Home"        => home
# }

# p test_match_data


# # RECORD TOP 15
# # Uncomment below to run
# # ======================

# def record_top_15_mapping(row)
#   {
#     "runs"      => row['Runs'],
#     "span"      => row['Span'],
#     "name"      => row['Player'],
#     "matches"   => row['Mat'],
#     "average"   => row['Ave'],
#     "top_score" => row['HS'],
#     "centuries" => row['100']
#   }
# end

# record_top_15 = []

# CSV.foreach('record_top_15.csv', headers: true) do |row|
#   record_top_15 << record_top_15_mapping(row)
# end

# p record_top_15

# # CUMULATIVE
# # Uncomment below to run
# # ======================

# def cumulative_mapping(row)
#   {
#     "cum_runs"  => row['Runs'],
#     "centuries" => row['100'],
#     "top_score" => row['HS'],
#     "match_num" => row['Mat'],
#     "vs"        => row['Opposition'],
#     "result"    => row['Result'],
#     "date"      => row['Start Date'],
#     "avg"       => row['Bat Av']
#   }
# end

# test_match_cumulative = []

# CSV.foreach('sachin_cumulative.csv', headers: true) do |row|
#   test_match_cumulative << cumulative_mapping(row)
# end

# p test_match_cumulative


# # INDIA WITHOUT SACHIN
# # Uncomment below to run
# # ======================

# def india_without_sachin_mapping(row)
#   {
#       "won_lost_by"   => row['Margin'],
#       "city"          => row['Ground'],
#       "batting_order" => row['Bat'],
#       "toss"          => row['Toss'],
#       "vs"            => row['Opposition'],
#       "result"        => row['Result'],
#       "date"          => row['Start Date']
#    }
# end

# india_without_sachin = []

# CSV.foreach('india_wo_sachin.csv', headers: true) do |row|
#   india_without_sachin << india_without_sachin_mapping(row)
# end

# p india_without_sachin

# # INDIA WITH SACHIN
# # Uncomment below to run
# # ======================

# def india_with_sachin_mapping(row)
#   {
#       "won_lost_by"   => row['Margin'],
#       "city"          => row['Ground'],
#       "batting_order" => row['Bat'],
#       "toss"          => row['Toss'],
#       "vs"            => row['Opposition'],
#       "match_result"        => row['Result'],
#       "date"          => row['Start Date'],
#       "sachin_score"  => row['Runs']
#    }
# end

# india_with_sachin = []

# CSV.foreach('india_with_sachin.csv', headers: true) do |row|
#   india_with_sachin << india_with_sachin_mapping(row)
# end

# p india_with_sachin

# # # Top 15 Players Cumulative
# # # Uncomment below to run
# # # ======================

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

# ['Sachin Tendulkar', 'Ricky Ponting', 'Jacques Kallis', 'Rahul Dravid', 'Brian Lara', 
#   'Mahela Jayawardene', 'Shivanarine Chanderpaul', 'Allan Border', 'Steve Waugh', 
#   'Kumar Sangakkara', 'Sunil Gavaskar', 'Graeme Smith', 'Graham Gooch', 
#   'Javed Miandad', 'Inzamam-ul-Haq'].each do |name|
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

# def convert_year_into_four_decimal_year(yr)
#   yr = yr.split('/')[2]
#   year = yr.to_i
#   year >= 0 and year < 15 ? "20#{yr}" : "19#{yr}"
# end

# def top_15_players_cumulative_runs(row)
#   [convert_year_into_four_decimal_year(row['Start Date']).to_i, row['Runs'].to_i]
# end

# def top_15_players_cumulative_avg(row)
#   [convert_year_into_four_decimal_year(row['Start Date']).to_i, row['Ave'].to_f]
# end

# def top_15_players_cumulative_100s(row)
#   [convert_year_into_four_decimal_year(row['Start Date']).to_i, row['100'].to_i]
# end

# top_15_players_cumulative_list_runs = []
# top_15_players_cumulative_list_avg  = []
# top_15_players_cumulative_list_100s = []

# ['Sachin Tendulkar', 'Ricky Ponting', 'Jacques Kallis', 'Rahul Dravid', 'Brian Lara', 
#   'Mahela Jayawardene', 'Shivanarine Chanderpaul', 'Allan Border', 'Steve Waugh', 
#   'Kumar Sangakkara', 'Sunil Gavaskar', 'Graeme Smith', 'Graham Gooch', 
#   'Javed Miandad', 'Inzamam-ul-Haq'].each do |name|
#     player = {
#       'name' => name
#     }
    
#     cumulative_runs = []
#     cumulative_avg  = []
#     cumulative_100s = []
#     # to determine last stat of the year
#     status = {index: 0, year: 1900}
#     CSV.foreach('top_15_players_cumulative.csv', headers: true) do |row|
#       if row['Name'] == name
#         player['country'] = row['Country']

#         # determine if this is first stat
#         if cumulative_runs.first.nil?
#           status[:year] = top_15_players_cumulative_runs(row)[0]

#           cumulative_runs << top_15_players_cumulative_runs(row)
#           cumulative_avg << top_15_players_cumulative_avg(row)
#           cumulative_100s << top_15_players_cumulative_100s(row)
#         end

#         # determine if this is last stat of the year
        
#         if (cumulative_runs.last[0] < top_15_players_cumulative_runs(row)[0])
#           status[:index] += 1
#           status[:year] = top_15_players_cumulative_runs(row)[0]
#         end
#         cumulative_runs[status[:index]] = top_15_players_cumulative_runs(row)
#         cumulative_avg[status[:index]]  = top_15_players_cumulative_avg(row)
#         cumulative_100s[status[:index]] = top_15_players_cumulative_100s(row)
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
