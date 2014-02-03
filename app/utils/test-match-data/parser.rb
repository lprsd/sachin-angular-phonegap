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
