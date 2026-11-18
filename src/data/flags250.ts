export type FlagPattern =
  | 'h_bicolor'
  | 'h_tricolor'
  | 'h_four'
  | 'v_bicolor'
  | 'v_tricolor'
  | 'nordic'
  | 'cross'
  | 'saltire'
  | 'canton_stripes'
  | 'canton_solid'
  | 'union_canton'
  | 'circle'
  | 'circle_off'
  | 'diamond'
  | 'chevron_h2'
  | 'chevron_h3'
  | 'diagonal'
  | 'vertical_band_h3'
  | 'vertical_band_h2'
  | 'quad';

export type FlagEmblem =
  | 'none'
  | 'star'
  | 'stars3'
  | 'crescent'
  | 'sun'
  | 'wheel'
  | 'maple'
  | 'shield'
  | 'crown'
  | 'yin_yang'
  | 'circle'
  | 'cross';

export interface CountryDef {
  code: string;
  name: string;
  pattern: FlagPattern;
  colors: string[];
  emblem?: FlagEmblem;
  emblemColor?: string;
}

export const COUNTRIES_250: CountryDef[] = [
  { code: 'AFG', name: 'Afghanistan', pattern: 'v_tricolor', colors: ['#111111', '#D32011', '#007A36'], emblem: 'shield', emblemColor: '#FFFFFF' },
  { code: 'ALA', name: 'Aland Islands', pattern: 'nordic', colors: ['#0053A5', '#FFCE00', '#D21034'] },
  { code: 'ALB', name: 'Albania', pattern: 'circle', colors: ['#E41E20', '#111111'], emblem: 'shield', emblemColor: '#111111' },
  { code: 'DZA', name: 'Algeria', pattern: 'v_bicolor', colors: ['#006233', '#FFFFFF'], emblem: 'crescent', emblemColor: '#D21034' },
  { code: 'ASM', name: 'American Samoa', pattern: 'chevron_h2', colors: ['#00205B', '#BD3039', '#FFFFFF'], emblem: 'star', emblemColor: '#FFFFFF' },
  { code: 'AND', name: 'Andorra', pattern: 'v_tricolor', colors: ['#10069F', '#FEDD00', '#D50032'], emblem: 'shield', emblemColor: '#7A4B12' },
  { code: 'AGO', name: 'Angola', pattern: 'h_bicolor', colors: ['#CC092F', '#111111'], emblem: 'wheel', emblemColor: '#FFCB00' },
  { code: 'AIA', name: 'Anguilla', pattern: 'union_canton', colors: ['#012169', '#FFFFFF', '#C8102E'], emblem: 'shield', emblemColor: '#6EE7B7' },
  { code: 'ATA', name: 'Antarctica', pattern: 'circle', colors: ['#1B365D', '#FFFFFF'] },
  { code: 'ATG', name: 'Antigua and Barbuda', pattern: 'chevron_h3', colors: ['#CE1126', '#111111', '#0072C6', '#FFFFFF'], emblem: 'sun', emblemColor: '#FCD116' },
  { code: 'ARG', name: 'Argentina', pattern: 'h_tricolor', colors: ['#74ACDF', '#FFFFFF', '#74ACDF'], emblem: 'sun', emblemColor: '#F6B40E' },
  { code: 'ARM', name: 'Armenia', pattern: 'h_tricolor', colors: ['#D90012', '#0033A0', '#F2A800'] },
  { code: 'ABW', name: 'Aruba', pattern: 'h_bicolor', colors: ['#418FDE', '#FFD100'], emblem: 'star', emblemColor: '#EF3340' },
  { code: 'AUS', name: 'Australia', pattern: 'union_canton', colors: ['#00008B', '#FFFFFF', '#FF0000'], emblem: 'stars3', emblemColor: '#FFFFFF' },
  { code: 'AUT', name: 'Austria', pattern: 'h_tricolor', colors: ['#ED2939', '#FFFFFF', '#ED2939'] },
  { code: 'AZE', name: 'Azerbaijan', pattern: 'h_tricolor', colors: ['#00B5E2', '#EF3340', '#509E2F'], emblem: 'crescent', emblemColor: '#FFFFFF' },
  { code: 'BHS', name: 'Bahamas', pattern: 'chevron_h3', colors: ['#111111', '#00778B', '#FFC72C', '#00778B'] },
  { code: 'BHR', name: 'Bahrain', pattern: 'v_bicolor', colors: ['#FFFFFF', '#CE1126'] },
  { code: 'BGD', name: 'Bangladesh', pattern: 'circle_off', colors: ['#006A4E', '#F42A41'] },
  { code: 'BRB', name: 'Barbados', pattern: 'v_tricolor', colors: ['#00267F', '#FFC726', '#00267F'], emblem: 'shield', emblemColor: '#111111' },
  { code: 'BLR', name: 'Belarus', pattern: 'h_bicolor', colors: ['#C8313E', '#4AA657'] },
  { code: 'BEL', name: 'Belgium', pattern: 'v_tricolor', colors: ['#111111', '#FAE042', '#ED2939'] },
  { code: 'BLZ', name: 'Belize', pattern: 'h_tricolor', colors: ['#D90F19', '#171696', '#D90F19'], emblem: 'circle', emblemColor: '#FFFFFF' },
  { code: 'BEN', name: 'Benin', pattern: 'vertical_band_h2', colors: ['#008751', '#FCD116', '#E8112D'] },
  { code: 'BMU', name: 'Bermuda', pattern: 'union_canton', colors: ['#CF142B', '#FFFFFF', '#012169'], emblem: 'shield', emblemColor: '#FFFFFF' },
  { code: 'BTN', name: 'Bhutan', pattern: 'diagonal', colors: ['#FF4E12', '#FFD520', '#FFFFFF'] },
  { code: 'BOL', name: 'Bolivia', pattern: 'h_tricolor', colors: ['#D52B1E', '#F9E300', '#007934'] },
  { code: 'BES', name: 'Bonaire', pattern: 'diagonal', colors: ['#F9D616', '#002B7F', '#FFFFFF'], emblem: 'star', emblemColor: '#DC171D' },
  { code: 'BIH', name: 'Bosnia and Herzegovina', pattern: 'diagonal', colors: ['#002395', '#FECB00', '#FFFFFF'], emblem: 'stars3', emblemColor: '#FFFFFF' },
  { code: 'BWA', name: 'Botswana', pattern: 'h_tricolor', colors: ['#6DA9D2', '#111111', '#6DA9D2'] },
  { code: 'BRA', name: 'Brazil', pattern: 'diamond', colors: ['#009C3B', '#FFDF00', '#002776'] },
  { code: 'IOT', name: 'British Indian Ocean Territory', pattern: 'union_canton', colors: ['#003580', '#FFFFFF', '#CE1126'], emblem: 'crown', emblemColor: '#FCD116' },
  { code: 'VGB', name: 'British Virgin Islands', pattern: 'union_canton', colors: ['#012169', '#FFFFFF', '#C8102E'], emblem: 'shield', emblemColor: '#10B981' },
  { code: 'BRN', name: 'Brunei', pattern: 'diagonal', colors: ['#F7E017', '#FFFFFF', '#111111'], emblem: 'crescent', emblemColor: '#CF1126' },
  { code: 'BGR', name: 'Bulgaria', pattern: 'h_tricolor', colors: ['#FFFFFF', '#00966E', '#D62612'] },
  { code: 'BFA', name: 'Burkina Faso', pattern: 'h_bicolor', colors: ['#EF2B2D', '#009E49'], emblem: 'star', emblemColor: '#FCD116' },
  { code: 'BDI', name: 'Burundi', pattern: 'saltire', colors: ['#CE1126', '#1EB53A', '#FFFFFF'], emblem: 'stars3', emblemColor: '#CE1126' },
  { code: 'CPV', name: 'Cabo Verde', pattern: 'h_tricolor', colors: ['#003893', '#FFFFFF', '#CF2027'], emblem: 'stars3', emblemColor: '#F7D116' },
  { code: 'KHM', name: 'Cambodia', pattern: 'h_tricolor', colors: ['#032EA1', '#E00025', '#032EA1'], emblem: 'crown', emblemColor: '#FFFFFF' },
  { code: 'CMR', name: 'Cameroon', pattern: 'v_tricolor', colors: ['#007A5E', '#CE1126', '#FCD116'], emblem: 'star', emblemColor: '#FCD116' },
  { code: 'CAN', name: 'Canada', pattern: 'v_tricolor', colors: ['#FF0000', '#FFFFFF', '#FF0000'], emblem: 'maple', emblemColor: '#FF0000' },
  { code: 'CYM', name: 'Cayman Islands', pattern: 'union_canton', colors: ['#012169', '#FFFFFF', '#C8102E'], emblem: 'shield', emblemColor: '#FCD116' },
  { code: 'CAF', name: 'Central African Republic', pattern: 'h_four', colors: ['#003082', '#FFFFFF', '#289728', '#FFCE00'], emblem: 'star', emblemColor: '#FFCE00' },
  { code: 'TCD', name: 'Chad', pattern: 'v_tricolor', colors: ['#002664', '#FECB00', '#C60C30'] },
  { code: 'CHL', name: 'Chile', pattern: 'canton_solid', colors: ['#FFFFFF', '#D52B1E', '#0039A6'], emblem: 'star', emblemColor: '#FFFFFF' },
  { code: 'CHN', name: 'China', pattern: 'circle', colors: ['#EE1C25', '#EE1C25'], emblem: 'stars3', emblemColor: '#FFFF00' },
  { code: 'CXR', name: 'Christmas Island', pattern: 'diagonal', colors: ['#0021AD', '#1C8A42', '#FFC100'] },
  { code: 'CCK', name: 'Cocos Islands', pattern: 'circle', colors: ['#006A4E', '#006A4E'], emblem: 'crescent', emblemColor: '#FFE000' },
  { code: 'COL', name: 'Colombia', pattern: 'h_tricolor', colors: ['#FCD116', '#003893', '#CE1126'] },
  { code: 'COM', name: 'Comoros', pattern: 'chevron_h3', colors: ['#3D8E33', '#FFC61E', '#FFFFFF', '#CE1126'], emblem: 'crescent', emblemColor: '#FFFFFF' },
  { code: 'COG', name: 'Congo', pattern: 'diagonal', colors: ['#009543', '#FBDE4A', '#DC241F'] },
  { code: 'COD', name: 'DR Congo', pattern: 'diagonal', colors: ['#007FFF', '#F7D618', '#CE1021'], emblem: 'star', emblemColor: '#F7D618' },
  { code: 'COK', name: 'Cook Islands', pattern: 'union_canton', colors: ['#012169', '#FFFFFF', '#C8102E'], emblem: 'stars3', emblemColor: '#FFFFFF' },
  { code: 'CRI', name: 'Costa Rica', pattern: 'h_tricolor', colors: ['#002B7F', '#CE1126', '#002B7F'] },
  { code: 'CIV', name: 'Cote d Ivoire', pattern: 'v_tricolor', colors: ['#F77F00', '#FFFFFF', '#009E60'] },
  { code: 'HRV', name: 'Croatia', pattern: 'h_tricolor', colors: ['#FF0000', '#FFFFFF', '#171796'], emblem: 'shield', emblemColor: '#FF0000' },
  { code: 'CUB', name: 'Cuba', pattern: 'chevron_h3', colors: ['#CF142B', '#002A8F', '#FFFFFF', '#002A8F'], emblem: 'star', emblemColor: '#FFFFFF' },
  { code: 'CUW', name: 'Curacao', pattern: 'h_bicolor', colors: ['#002B7F', '#F9E814'], emblem: 'stars3', emblemColor: '#FFFFFF' },
  { code: 'CYP', name: 'Cyprus', pattern: 'circle', colors: ['#FFFFFF', '#D57800'] },
  { code: 'CZE', name: 'Czechia', pattern: 'chevron_h2', colors: ['#11457E', '#FFFFFF', '#D7141A'] },
  { code: 'DNK', name: 'Denmark', pattern: 'nordic', colors: ['#C60C30', '#FFFFFF'] },
  { code: 'DJI', name: 'Djibouti', pattern: 'chevron_h2', colors: ['#FFFFFF', '#6AB2E7', '#12AD2B'], emblem: 'star', emblemColor: '#D7141A' },
  { code: 'DMA', name: 'Dominica', pattern: 'cross', colors: ['#006B3F', '#FCD116', '#111111'], emblem: 'circle', emblemColor: '#D41C30' },
  { code: 'DOM', name: 'Dominican Republic', pattern: 'cross', colors: ['#002D62', '#FFFFFF', '#CE1126'] },
  { code: 'ECU', name: 'Ecuador', pattern: 'h_tricolor', colors: ['#FFD100', '#0033A0', '#EF3340'], emblem: 'shield', emblemColor: '#7A4B12' },
  { code: 'EGY', name: 'Egypt', pattern: 'h_tricolor', colors: ['#CE1126', '#FFFFFF', '#111111'], emblem: 'crown', emblemColor: '#C09300' },
  { code: 'SLV', name: 'El Salvador', pattern: 'h_tricolor', colors: ['#0F47AF', '#FFFFFF', '#0F47AF'], emblem: 'shield', emblemColor: '#F59E0B' },
  { code: 'ENG', name: 'England', pattern: 'cross', colors: ['#FFFFFF', '#CE1126'] },
  { code: 'GNQ', name: 'Equatorial Guinea', pattern: 'chevron_h3', colors: ['#0073CE', '#3E9A00', '#FFFFFF', '#E32118'], emblem: 'shield', emblemColor: '#7A4B12' },
  { code: 'ERI', name: 'Eritrea', pattern: 'chevron_h2', colors: ['#EA0437', '#12AD2B', '#4189DD'], emblem: 'crown', emblemColor: '#FFC726' },
  { code: 'EST', name: 'Estonia', pattern: 'h_tricolor', colors: ['#0072CE', '#111111', '#FFFFFF'] },
  { code: 'SWZ', name: 'Eswatini', pattern: 'h_tricolor', colors: ['#3E5EB9', '#B10C0C', '#3E5EB9'], emblem: 'shield', emblemColor: '#FFFFFF' },
  { code: 'ETH', name: 'Ethiopia', pattern: 'h_tricolor', colors: ['#078930', '#FCDD09', '#DA121A'], emblem: 'star', emblemColor: '#0F47AF' },
  { code: 'FLK', name: 'Falkland Islands', pattern: 'union_canton', colors: ['#012169', '#FFFFFF', '#C8102E'], emblem: 'shield', emblemColor: '#FCD116' },
  { code: 'FRO', name: 'Faroe Islands', pattern: 'nordic', colors: ['#FFFFFF', '#005EB8', '#ED2939'] },
  { code: 'FJI', name: 'Fiji', pattern: 'union_canton', colors: ['#68BFE5', '#FFFFFF', '#C8102E'], emblem: 'shield', emblemColor: '#CE1126' },
  { code: 'FIN', name: 'Finland', pattern: 'nordic', colors: ['#FFFFFF', '#002F6C'] },
  { code: 'FRA', name: 'France', pattern: 'v_tricolor', colors: ['#002395', '#FFFFFF', '#ED2939'] },
  { code: 'GUF', name: 'French Guiana', pattern: 'diagonal', colors: ['#078930', '#FCDD09', '#FCDD09'], emblem: 'star', emblemColor: '#DA121A' },
  { code: 'PYF', name: 'French Polynesia', pattern: 'h_tricolor', colors: ['#CE1126', '#FFFFFF', '#CE1126'], emblem: 'sun', emblemColor: '#FCD116' },
  { code: 'GAB', name: 'Gabon', pattern: 'h_tricolor', colors: ['#009E60', '#FCD116', '#3A75C4'] },
  { code: 'GMB', name: 'Gambia', pattern: 'h_tricolor', colors: ['#CE1126', '#0C1C8C', '#3A7728'] },
  { code: 'GEO', name: 'Georgia', pattern: 'cross', colors: ['#FFFFFF', '#FF0000'] },
  { code: 'DEU', name: 'Germany', pattern: 'h_tricolor', colors: ['#111111', '#DD0000', '#FFCE00'] },
  { code: 'GHA', name: 'Ghana', pattern: 'h_tricolor', colors: ['#CF0921', '#FCD20F', '#006B3D'], emblem: 'star', emblemColor: '#111111' },
  { code: 'GIB', name: 'Gibraltar', pattern: 'h_bicolor', colors: ['#FFFFFF', '#DA000C'], emblem: 'crown', emblemColor: '#DA000C' },
  { code: 'GRC', name: 'Greece', pattern: 'canton_stripes', colors: ['#0D5EAF', '#FFFFFF'] },
  { code: 'GRL', name: 'Greenland', pattern: 'circle', colors: ['#FFFFFF', '#D00C33'] },
  { code: 'GRD', name: 'Grenada', pattern: 'quad', colors: ['#CE1126', '#FCD116', '#007A5E', '#CE1126'], emblem: 'star', emblemColor: '#FCD116' },
  { code: 'GLP', name: 'Guadeloupe', pattern: 'v_tricolor', colors: ['#111111', '#FCD116', '#002395'], emblem: 'sun', emblemColor: '#FCD116' },
  { code: 'GUM', name: 'Guam', pattern: 'circle', colors: ['#002868', '#002868'], emblem: 'shield', emblemColor: '#BF0A30' },
  { code: 'GTM', name: 'Guatemala', pattern: 'v_tricolor', colors: ['#4997D0', '#FFFFFF', '#4997D0'], emblem: 'crown', emblemColor: '#10B981' },
  { code: 'GGY', name: 'Guernsey', pattern: 'cross', colors: ['#FFFFFF', '#E8112D', '#F9DD16'] },
  { code: 'GIN', name: 'Guinea', pattern: 'v_tricolor', colors: ['#CE1126', '#FCD116', '#009460'] },
  { code: 'GNB', name: 'Guinea-Bissau', pattern: 'vertical_band_h2', colors: ['#CE1126', '#FCD116', '#009E49'], emblem: 'star', emblemColor: '#111111' },
  { code: 'GUY', name: 'Guyana', pattern: 'chevron_h2', colors: ['#CE1126', '#FCD116', '#009E49'] },
  { code: 'HTI', name: 'Haiti', pattern: 'h_bicolor', colors: ['#00209F', '#D21034'], emblem: 'shield', emblemColor: '#FFFFFF' },
  { code: 'HND', name: 'Honduras', pattern: 'h_tricolor', colors: ['#00BCE4', '#FFFFFF', '#00BCE4'], emblem: 'stars3', emblemColor: '#00BCE4' },
  { code: 'HKG', name: 'Hong Kong', pattern: 'circle', colors: ['#DE2910', '#FFFFFF'], emblem: 'star', emblemColor: '#FFFFFF' },
  { code: 'HUN', name: 'Hungary', pattern: 'h_tricolor', colors: ['#CD2A3E', '#FFFFFF', '#436F4D'] },
  { code: 'ISL', name: 'Iceland', pattern: 'nordic', colors: ['#02529C', '#FFFFFF', '#DC1E35'] },
  { code: 'IND', name: 'India', pattern: 'h_tricolor', colors: ['#FF9933', '#FFFFFF', '#138808'], emblem: 'wheel', emblemColor: '#000080' },
  { code: 'IDN', name: 'Indonesia', pattern: 'h_bicolor', colors: ['#CE1126', '#FFFFFF'] },
  { code: 'IRN', name: 'Iran', pattern: 'h_tricolor', colors: ['#239F40', '#FFFFFF', '#DA0000'], emblem: 'crescent', emblemColor: '#DA0000' },
  { code: 'IRQ', name: 'Iraq', pattern: 'h_tricolor', colors: ['#CE1126', '#FFFFFF', '#111111'], emblem: 'stars3', emblemColor: '#007A3D' },
  { code: 'IRL', name: 'Ireland', pattern: 'v_tricolor', colors: ['#169B62', '#FFFFFF', '#FF883E'] },
  { code: 'IMN', name: 'Isle of Man', pattern: 'circle', colors: ['#CF142B', '#FFFFFF'], emblem: 'wheel', emblemColor: '#FFFFFF' },
  { code: 'ISR', name: 'Israel', pattern: 'h_tricolor', colors: ['#0038B8', '#FFFFFF', '#0038B8'], emblem: 'star', emblemColor: '#0038B8' },
  { code: 'ITA', name: 'Italy', pattern: 'v_tricolor', colors: ['#009246', '#FFFFFF', '#CE2B37'] },
  { code: 'JAM', name: 'Jamaica', pattern: 'saltire', colors: ['#009B3A', '#111111', '#FED100'] },
  { code: 'JPN', name: 'Japan', pattern: 'circle', colors: ['#FFFFFF', '#BC002D'] },
  { code: 'JEY', name: 'Jersey', pattern: 'saltire', colors: ['#FFFFFF', '#FFFFFF', '#DF1127'], emblem: 'crown', emblemColor: '#FCD116' },
  { code: 'JOR', name: 'Jordan', pattern: 'chevron_h3', colors: ['#CE1126', '#111111', '#FFFFFF', '#007A3D'], emblem: 'star', emblemColor: '#FFFFFF' },
  { code: 'KAZ', name: 'Kazakhstan', pattern: 'circle', colors: ['#00AFCA', '#FEC50C'], emblem: 'sun', emblemColor: '#FEC50C' },
  { code: 'KEN', name: 'Kenya', pattern: 'h_tricolor', colors: ['#111111', '#BB0000', '#006600'], emblem: 'shield', emblemColor: '#FFFFFF' },
  { code: 'KIR', name: 'Kiribati', pattern: 'h_bicolor', colors: ['#CE1126', '#003F87'], emblem: 'sun', emblemColor: '#FCD116' },
  { code: 'PRK', name: 'North Korea', pattern: 'h_tricolor', colors: ['#024FA2', '#ED1C27', '#024FA2'], emblem: 'star', emblemColor: '#FFFFFF' },
  { code: 'KOR', name: 'South Korea', pattern: 'circle', colors: ['#FFFFFF', '#CD2E3A'], emblem: 'yin_yang', emblemColor: '#0047A0' },
  { code: 'KOS', name: 'Kosovo', pattern: 'circle', colors: ['#244AA5', '#D0A650'], emblem: 'stars3', emblemColor: '#FFFFFF' },
  { code: 'KWT', name: 'Kuwait', pattern: 'chevron_h3', colors: ['#111111', '#007A3D', '#FFFFFF', '#CE1126'] },
  { code: 'KGZ', name: 'Kyrgyzstan', pattern: 'circle', colors: ['#E8112D', '#FFEF00'], emblem: 'sun', emblemColor: '#FFEF00' },
  { code: 'LAO', name: 'Laos', pattern: 'h_tricolor', colors: ['#CE1126', '#002868', '#CE1126'], emblem: 'circle', emblemColor: '#FFFFFF' },
  { code: 'LVA', name: 'Latvia', pattern: 'h_tricolor', colors: ['#9E3039', '#FFFFFF', '#9E3039'] },
  { code: 'LBN', name: 'Lebanon', pattern: 'h_tricolor', colors: ['#ED1C24', '#FFFFFF', '#ED1C24'], emblem: 'crown', emblemColor: '#00A651' },
  { code: 'LSO', name: 'Lesotho', pattern: 'h_tricolor', colors: ['#00209F', '#FFFFFF', '#009543'], emblem: 'shield', emblemColor: '#111111' },
  { code: 'LBR', name: 'Liberia', pattern: 'canton_stripes', colors: ['#BF0A30', '#FFFFFF', '#002868'], emblem: 'star', emblemColor: '#FFFFFF' },
  { code: 'LBY', name: 'Libya', pattern: 'h_tricolor', colors: ['#E70013', '#111111', '#239E46'], emblem: 'crescent', emblemColor: '#FFFFFF' },
  { code: 'LIE', name: 'Liechtenstein', pattern: 'h_bicolor', colors: ['#002B7F', '#CE1126'], emblem: 'crown', emblemColor: '#FFD83D' },
  { code: 'LTU', name: 'Lithuania', pattern: 'h_tricolor', colors: ['#FDB913', '#006A44', '#C1272D'] },
  { code: 'LUX', name: 'Luxembourg', pattern: 'h_tricolor', colors: ['#EA141D', '#FFFFFF', '#51ADDA'] },
  { code: 'MAC', name: 'Macau', pattern: 'circle', colors: ['#00785E', '#FFFFFF'], emblem: 'stars3', emblemColor: '#FFDE00' },
  { code: 'MDG', name: 'Madagascar', pattern: 'vertical_band_h2', colors: ['#FFFFFF', '#FC3D32', '#007E3A'] },
  { code: 'MWI', name: 'Malawi', pattern: 'h_tricolor', colors: ['#111111', '#CE1126', '#339E35'], emblem: 'sun', emblemColor: '#CE1126' },
  { code: 'MYS', name: 'Malaysia', pattern: 'canton_stripes', colors: ['#CC0001', '#FFFFFF', '#010066'], emblem: 'crescent', emblemColor: '#FFCC00' },
  { code: 'MDV', name: 'Maldives', pattern: 'circle', colors: ['#D21034', '#007E3A'], emblem: 'crescent', emblemColor: '#FFFFFF' },
  { code: 'MLI', name: 'Mali', pattern: 'v_tricolor', colors: ['#14B53A', '#FCD116', '#CE1126'] },
  { code: 'MLT', name: 'Malta', pattern: 'v_bicolor', colors: ['#FFFFFF', '#CF142B'], emblem: 'shield', emblemColor: '#94A3B8' },
  { code: 'MHL', name: 'Marshall Islands', pattern: 'diagonal', colors: ['#003893', '#DD7500', '#FFFFFF'], emblem: 'sun', emblemColor: '#FFFFFF' },
  { code: 'MTQ', name: 'Martinique', pattern: 'chevron_h2', colors: ['#EF1923', '#00A650', '#111111'] },
  { code: 'MRT', name: 'Mauritania', pattern: 'h_tricolor', colors: ['#D01C1F', '#00A95C', '#D01C1F'], emblem: 'crescent', emblemColor: '#FFD700' },
  { code: 'MUS', name: 'Mauritius', pattern: 'h_four', colors: ['#EA2839', '#1A206D', '#FFD500', '#00A551'] },
  { code: 'MYT', name: 'Mayotte', pattern: 'v_tricolor', colors: ['#002395', '#FFFFFF', '#ED2939'], emblem: 'shield', emblemColor: '#F59E0B' },
  { code: 'MEX', name: 'Mexico', pattern: 'v_tricolor', colors: ['#006847', '#FFFFFF', '#CE1126'], emblem: 'shield', emblemColor: '#7A4B12' },
  { code: 'FSM', name: 'Micronesia', pattern: 'circle', colors: ['#75B2DD', '#75B2DD'], emblem: 'stars3', emblemColor: '#FFFFFF' },
  { code: 'MDA', name: 'Moldova', pattern: 'v_tricolor', colors: ['#0046AE', '#FFD200', '#CC092F'], emblem: 'shield', emblemColor: '#7A4B12' },
  { code: 'MCO', name: 'Monaco', pattern: 'h_bicolor', colors: ['#CE1126', '#FFFFFF'] },
  { code: 'MNG', name: 'Mongolia', pattern: 'v_tricolor', colors: ['#DA2032', '#0066B3', '#DA2032'], emblem: 'sun', emblemColor: '#FFD900' },
  { code: 'MNE', name: 'Montenegro', pattern: 'circle', colors: ['#C40308', '#D3AE3B'], emblem: 'crown', emblemColor: '#D3AE3B' },
  { code: 'MSR', name: 'Montserrat', pattern: 'union_canton', colors: ['#012169', '#FFFFFF', '#C8102E'], emblem: 'shield', emblemColor: '#10B981' },
  { code: 'MAR', name: 'Morocco', pattern: 'circle', colors: ['#C1272D', '#C1272D'], emblem: 'star', emblemColor: '#006233' },
  { code: 'MOZ', name: 'Mozambique', pattern: 'chevron_h3', colors: ['#D21034', '#007168', '#111111', '#FCE100'], emblem: 'star', emblemColor: '#FCE100' },
  { code: 'MMR', name: 'Myanmar', pattern: 'h_tricolor', colors: ['#FECB00', '#34B233', '#EA2839'], emblem: 'star', emblemColor: '#FFFFFF' },
  { code: 'NAM', name: 'Namibia', pattern: 'diagonal', colors: ['#003580', '#D21034', '#009543'], emblem: 'sun', emblemColor: '#FFCE00' },
  { code: 'NRU', name: 'Nauru', pattern: 'h_tricolor', colors: ['#002B7F', '#FFC61E', '#002B7F'], emblem: 'star', emblemColor: '#FFFFFF' },
  { code: 'NPL', name: 'Nepal', pattern: 'chevron_h2', colors: ['#DC143C', '#003893', '#DC143C'], emblem: 'sun', emblemColor: '#FFFFFF' },
  { code: 'NLD', name: 'Netherlands', pattern: 'h_tricolor', colors: ['#AE1C28', '#FFFFFF', '#21468B'] },
  { code: 'NCL', name: 'New Caledonia', pattern: 'h_tricolor', colors: ['#0035AD', '#ED4135', '#009543'], emblem: 'sun', emblemColor: '#FAE600' },
  { code: 'NZL', name: 'New Zealand', pattern: 'union_canton', colors: ['#00247D', '#FFFFFF', '#CC142B'], emblem: 'stars3', emblemColor: '#CC142B' },
  { code: 'NIC', name: 'Nicaragua', pattern: 'h_tricolor', colors: ['#0067C6', '#FFFFFF', '#0067C6'], emblem: 'shield', emblemColor: '#F59E0B' },
  { code: 'NER', name: 'Niger', pattern: 'h_tricolor', colors: ['#E05206', '#FFFFFF', '#0DB02B'], emblem: 'circle', emblemColor: '#E05206' },
  { code: 'NGA', name: 'Nigeria', pattern: 'v_tricolor', colors: ['#008751', '#FFFFFF', '#008751'] },
  { code: 'NIU', name: 'Niue', pattern: 'union_canton', colors: ['#FEDD00', '#FFFFFF', '#C8102E'], emblem: 'star', emblemColor: '#FEDD00' },
  { code: 'NFK', name: 'Norfolk Island', pattern: 'v_tricolor', colors: ['#007A3D', '#FFFFFF', '#007A3D'], emblem: 'crown', emblemColor: '#007A3D' },
  { code: 'MKD', name: 'North Macedonia', pattern: 'saltire', colors: ['#D20000', '#FFE600', '#FFE600'], emblem: 'sun', emblemColor: '#FFE600' },
  { code: 'NIR', name: 'Northern Ireland', pattern: 'cross', colors: ['#FFFFFF', '#CE1126'], emblem: 'crown', emblemColor: '#FCD116' },
  { code: 'MNP', name: 'Northern Mariana Islands', pattern: 'circle', colors: ['#0066B3', '#FFFFFF'], emblem: 'star', emblemColor: '#FFFFFF' },
  { code: 'NOR', name: 'Norway', pattern: 'nordic', colors: ['#BA0C2F', '#FFFFFF', '#00205B'] },
  { code: 'OMN', name: 'Oman', pattern: 'vertical_band_h3', colors: ['#DB161B', '#FFFFFF', '#DB161B', '#008000'] },
  { code: 'PAK', name: 'Pakistan', pattern: 'v_bicolor', colors: ['#FFFFFF', '#01411C'], emblem: 'crescent', emblemColor: '#FFFFFF' },
  { code: 'PLW', name: 'Palau', pattern: 'circle_off', colors: ['#0099FF', '#FFDE00'] },
  { code: 'PSE', name: 'Palestine', pattern: 'chevron_h3', colors: ['#CE1126', '#111111', '#FFFFFF', '#007A3D'] },
  { code: 'PAN', name: 'Panama', pattern: 'quad', colors: ['#FFFFFF', '#D21034', '#005293', '#FFFFFF'], emblem: 'star', emblemColor: '#005293' },
  { code: 'PNG', name: 'Papua New Guinea', pattern: 'diagonal', colors: ['#111111', '#CE1126', '#FCD116'] },
  { code: 'PRY', name: 'Paraguay', pattern: 'h_tricolor', colors: ['#D52B1E', '#FFFFFF', '#0038A8'], emblem: 'circle', emblemColor: '#FCD116' },
  { code: 'PER', name: 'Peru', pattern: 'v_tricolor', colors: ['#D91023', '#FFFFFF', '#D91023'] },
  { code: 'PHL', name: 'Philippines', pattern: 'chevron_h2', colors: ['#FFFFFF', '#0038A8', '#CE1126'], emblem: 'sun', emblemColor: '#FCD116' },
  { code: 'PCN', name: 'Pitcairn Islands', pattern: 'union_canton', colors: ['#012169', '#FFFFFF', '#C8102E'], emblem: 'shield', emblemColor: '#FCD116' },
  { code: 'POL', name: 'Poland', pattern: 'h_bicolor', colors: ['#FFFFFF', '#DC143C'] },
  { code: 'PRT', name: 'Portugal', pattern: 'v_bicolor', colors: ['#006600', '#FF0000'], emblem: 'shield', emblemColor: '#FFCC00' },
  { code: 'PRI', name: 'Puerto Rico', pattern: 'chevron_h3', colors: ['#0050F0', '#ED0000', '#FFFFFF', '#ED0000'], emblem: 'star', emblemColor: '#FFFFFF' },
  { code: 'QAT', name: 'Qatar', pattern: 'v_bicolor', colors: ['#FFFFFF', '#8D1B3D'] },
  { code: 'REU', name: 'Reunion', pattern: 'diagonal', colors: ['#002395', '#FF0000', '#FFE600'] },
  { code: 'ROU', name: 'Romania', pattern: 'v_tricolor', colors: ['#002B7F', '#FCD116', '#CE1126'] },
  { code: 'RUS', name: 'Russia', pattern: 'h_tricolor', colors: ['#FFFFFF', '#0039A6', '#D52B1E'] },
  { code: 'RWA', name: 'Rwanda', pattern: 'h_tricolor', colors: ['#00A1DE', '#FAD201', '#20603D'], emblem: 'sun', emblemColor: '#E5BE01' },
  { code: 'BLM', name: 'Saint Barthelemy', pattern: 'circle', colors: ['#FFFFFF', '#002395'], emblem: 'shield', emblemColor: '#FCD116' },
  { code: 'SHN', name: 'Saint Helena', pattern: 'union_canton', colors: ['#012169', '#FFFFFF', '#C8102E'], emblem: 'shield', emblemColor: '#FCD116' },
  { code: 'KNA', name: 'Saint Kitts and Nevis', pattern: 'diagonal', colors: ['#009E49', '#CE1126', '#111111'], emblem: 'stars3', emblemColor: '#FFFFFF' },
  { code: 'LCA', name: 'Saint Lucia', pattern: 'circle', colors: ['#66CCFF', '#FCD116'], emblem: 'shield', emblemColor: '#111111' },
  { code: 'MAF', name: 'Saint Martin', pattern: 'v_tricolor', colors: ['#003787', '#FFFFFF', '#CF142B'], emblem: 'sun', emblemColor: '#F9D616' },
  { code: 'SPM', name: 'Saint Pierre and Miquelon', pattern: 'v_bicolor', colors: ['#002395', '#0055A4'], emblem: 'shield', emblemColor: '#FCD116' },
  { code: 'VCT', name: 'Saint Vincent and the Grenadines', pattern: 'v_tricolor', colors: ['#0072C6', '#FCD116', '#009E60'], emblem: 'stars3', emblemColor: '#009E60' },
  { code: 'WSM', name: 'Samoa', pattern: 'canton_solid', colors: ['#CE1126', '#CE1126', '#002B7F'], emblem: 'stars3', emblemColor: '#FFFFFF' },
  { code: 'SMR', name: 'San Marino', pattern: 'h_bicolor', colors: ['#FFFFFF', '#5EB6E4'], emblem: 'crown', emblemColor: '#D4AF37' },
  { code: 'STP', name: 'Sao Tome and Principe', pattern: 'chevron_h3', colors: ['#D21034', '#12AD2B', '#FFCE00', '#12AD2B'], emblem: 'stars3', emblemColor: '#111111' },
  { code: 'SAU', name: 'Saudi Arabia', pattern: 'circle', colors: ['#006C35', '#006C35'], emblem: 'crown', emblemColor: '#FFFFFF' },
  { code: 'SCO', name: 'Scotland', pattern: 'saltire', colors: ['#005EB8', '#005EB8', '#FFFFFF'] },
  { code: 'SEN', name: 'Senegal', pattern: 'v_tricolor', colors: ['#00853F', '#FDEF42', '#E31B23'], emblem: 'star', emblemColor: '#00853F' },
  { code: 'SRB', name: 'Serbia', pattern: 'h_tricolor', colors: ['#C6363C', '#0C4076', '#FFFFFF'], emblem: 'shield', emblemColor: '#FFFFFF' },
  { code: 'SYC', name: 'Seychelles', pattern: 'diagonal', colors: ['#003D88', '#FCD955', '#D92223'] },
  { code: 'SLE', name: 'Sierra Leone', pattern: 'h_tricolor', colors: ['#1EB53A', '#FFFFFF', '#0072C6'] },
  { code: 'SGP', name: 'Singapore', pattern: 'h_bicolor', colors: ['#EF3340', '#FFFFFF'], emblem: 'crescent', emblemColor: '#FFFFFF' },
  { code: 'SXM', name: 'Sint Maarten', pattern: 'chevron_h2', colors: ['#FFFFFF', '#ED2939', '#003087'], emblem: 'shield', emblemColor: '#FCD116' },
  { code: 'SVK', name: 'Slovakia', pattern: 'h_tricolor', colors: ['#FFFFFF', '#0B4EA2', '#EE1C25'], emblem: 'shield', emblemColor: '#FFFFFF' },
  { code: 'SVN', name: 'Slovenia', pattern: 'h_tricolor', colors: ['#FFFFFF', '#005CE6', '#ED1C24'], emblem: 'shield', emblemColor: '#FFFFFF' },
  { code: 'SLB', name: 'Solomon Islands', pattern: 'diagonal', colors: ['#0051BA', '#FCD116', '#215B33'], emblem: 'stars3', emblemColor: '#FFFFFF' },
  { code: 'SOM', name: 'Somalia', pattern: 'circle', colors: ['#4189DD', '#4189DD'], emblem: 'star', emblemColor: '#FFFFFF' },
  { code: 'ZAF', name: 'South Africa', pattern: 'chevron_h3', colors: ['#111111', '#E03C31', '#007749', '#001489'] },
  { code: 'SSD', name: 'South Sudan', pattern: 'chevron_h3', colors: ['#0F47AF', '#111111', '#DA121A', '#078930'], emblem: 'star', emblemColor: '#FCDD09' },
  { code: 'ESP', name: 'Spain', pattern: 'h_tricolor', colors: ['#AA151B', '#F1BF00', '#AA151B'], emblem: 'crown', emblemColor: '#AA151B' },
  { code: 'LKA', name: 'Sri Lanka', pattern: 'v_bicolor', colors: ['#00534E', '#8D153A'], emblem: 'shield', emblemColor: '#FFBE29' },
  { code: 'SDN', name: 'Sudan', pattern: 'chevron_h3', colors: ['#007229', '#D21034', '#FFFFFF', '#111111'] },
  { code: 'SUR', name: 'Suriname', pattern: 'h_tricolor', colors: ['#377E3F', '#B40A2D', '#377E3F'], emblem: 'star', emblemColor: '#ECC81D' },
  { code: 'SJM', name: 'Svalbard', pattern: 'nordic', colors: ['#BA0C2F', '#FFFFFF', '#00205B'] },
  { code: 'SWE', name: 'Sweden', pattern: 'nordic', colors: ['#006AA7', '#FECC00'] },
  { code: 'CHE', name: 'Switzerland', pattern: 'cross', colors: ['#FF0000', '#FFFFFF'] },
  { code: 'SYR', name: 'Syria', pattern: 'h_tricolor', colors: ['#CE1126', '#FFFFFF', '#111111'], emblem: 'stars3', emblemColor: '#007A3D' },
  { code: 'TWN', name: 'Taiwan', pattern: 'canton_solid', colors: ['#FE0000', '#FE0000', '#000095'], emblem: 'sun', emblemColor: '#FFFFFF' },
  { code: 'TJK', name: 'Tajikistan', pattern: 'h_tricolor', colors: ['#CC0000', '#FFFFFF', '#006600'], emblem: 'crown', emblemColor: '#F8C300' },
  { code: 'TZA', name: 'Tanzania', pattern: 'diagonal', colors: ['#1EB53A', '#111111', '#00A3DD'] },
  { code: 'THA', name: 'Thailand', pattern: 'h_tricolor', colors: ['#A51931', '#FFFFFF', '#2D2A4A'] },
  { code: 'TLS', name: 'Timor-Leste', pattern: 'chevron_h2', colors: ['#111111', '#DC241F', '#DC241F'], emblem: 'star', emblemColor: '#FFFFFF' },
  { code: 'TGO', name: 'Togo', pattern: 'canton_stripes', colors: ['#006A4E', '#FFCE00', '#D21034'], emblem: 'star', emblemColor: '#FFFFFF' },
  { code: 'TKL', name: 'Tokelau', pattern: 'circle', colors: ['#002B7F', '#FEDD00'] },
  { code: 'TON', name: 'Tonga', pattern: 'canton_solid', colors: ['#C10000', '#C10000', '#FFFFFF'], emblem: 'cross', emblemColor: '#C10000' },
  { code: 'TTO', name: 'Trinidad and Tobago', pattern: 'diagonal', colors: ['#CE1126', '#111111', '#CE1126'] },
  { code: 'TUN', name: 'Tunisia', pattern: 'circle', colors: ['#E70013', '#FFFFFF'], emblem: 'crescent', emblemColor: '#E70013' },
  { code: 'TUR', name: 'Turkey', pattern: 'circle', colors: ['#E30A17', '#E30A17'], emblem: 'crescent', emblemColor: '#FFFFFF' },
  { code: 'TKM', name: 'Turkmenistan', pattern: 'v_bicolor', colors: ['#881E2B', '#00843D'], emblem: 'crescent', emblemColor: '#FFFFFF' },
  { code: 'TCA', name: 'Turks and Caicos Islands', pattern: 'union_canton', colors: ['#012169', '#FFFFFF', '#C8102E'], emblem: 'shield', emblemColor: '#FCD116' },
  { code: 'TUV', name: 'Tuvalu', pattern: 'union_canton', colors: ['#009CDE', '#FFFFFF', '#C8102E'], emblem: 'stars3', emblemColor: '#FEDD00' },
  { code: 'UGA', name: 'Uganda', pattern: 'h_tricolor', colors: ['#111111', '#FCDC04', '#D90000'], emblem: 'circle', emblemColor: '#FFFFFF' },
  { code: 'UKR', name: 'Ukraine', pattern: 'h_bicolor', colors: ['#0057B7', '#FFD700'] },
  { code: 'ARE', name: 'United Arab Emirates', pattern: 'vertical_band_h3', colors: ['#FF0000', '#00732F', '#FFFFFF', '#111111'] },
  { code: 'GBR', name: 'United Kingdom', pattern: 'saltire', colors: ['#012169', '#FFFFFF', '#C8102E'] },
  { code: 'USA', name: 'United States', pattern: 'canton_stripes', colors: ['#B91C1C', '#FFFFFF', '#1E3A8A'], emblem: 'stars3', emblemColor: '#FFFFFF' },
  { code: 'URY', name: 'Uruguay', pattern: 'canton_stripes', colors: ['#FFFFFF', '#0038A8', '#FFFFFF'], emblem: 'sun', emblemColor: '#FCD116' },
  { code: 'VIR', name: 'US Virgin Islands', pattern: 'circle', colors: ['#FFFFFF', '#FCD116'], emblem: 'shield', emblemColor: '#002868' },
  { code: 'UZB', name: 'Uzbekistan', pattern: 'h_tricolor', colors: ['#0099B5', '#FFFFFF', '#1EB53A'], emblem: 'crescent', emblemColor: '#FFFFFF' },
  { code: 'VUT', name: 'Vanuatu', pattern: 'chevron_h2', colors: ['#111111', '#D21034', '#009543'], emblem: 'crown', emblemColor: '#FDCE12' },
  { code: 'VAT', name: 'Vatican City', pattern: 'v_bicolor', colors: ['#FFE000', '#FFFFFF'], emblem: 'crown', emblemColor: '#D4AF37' },
  { code: 'VEN', name: 'Venezuela', pattern: 'h_tricolor', colors: ['#FCE300', '#00247D', '#CF142B'], emblem: 'stars3', emblemColor: '#FFFFFF' },
  { code: 'VNM', name: 'Vietnam', pattern: 'circle', colors: ['#DA251D', '#DA251D'], emblem: 'star', emblemColor: '#FFFF00' },
  { code: 'WLS', name: 'Wales', pattern: 'h_bicolor', colors: ['#FFFFFF', '#00AD36'], emblem: 'shield', emblemColor: '#D30731' },
  { code: 'WLF', name: 'Wallis and Futuna', pattern: 'union_canton', colors: ['#ED2939', '#FFFFFF', '#002395'] },
  { code: 'ESH', name: 'Western Sahara', pattern: 'chevron_h3', colors: ['#C4111B', '#111111', '#FFFFFF', '#007A3D'], emblem: 'crescent', emblemColor: '#C4111B' },
  { code: 'YEM', name: 'Yemen', pattern: 'h_tricolor', colors: ['#CE1126', '#FFFFFF', '#111111'] },
  { code: 'ZMB', name: 'Zambia', pattern: 'circle', colors: ['#198A00', '#DE2010'], emblem: 'crown', emblemColor: '#EF7D00' },
  { code: 'ZWE', name: 'Zimbabwe', pattern: 'chevron_h3', colors: ['#FFFFFF', '#006400', '#FFD200', '#D40000'], emblem: 'star', emblemColor: '#D40000' },
  { code: 'ABH', name: 'Abkhazia', pattern: 'canton_stripes', colors: ['#00993E', '#FFFFFF', '#D21034'] },
];

export const COUNTRY_250_MAP: Record<string, CountryDef> = Object.fromEntries(
  COUNTRIES_250.map((c) => [c.code, c])
);

export type TeamKey = 'A' | 'B' | 'C' | 'D' | 'E';
export const TEAM_KEYS: TeamKey[] = ['A', 'B', 'C', 'D', 'E'];

export type TournamentPhase =
  | 'AWAITING_START'
  | 'TEAM_ANNOUNCE'
  | 'TEAM_BATTLE'
  | 'TEAM_TOP3_ANNOUNCE'
  | 'FINAL_ANNOUNCE'
  | 'FINAL_BATTLE'
  | 'CHAMPION_CELEBRATION';

export function shuffleAndSplitInto5Teams(): Record<TeamKey, string[]> {
  const pool = COUNTRIES_250.map((c) => c.code);
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = pool[i];
    pool[i] = pool[j];
    pool[j] = tmp;
  }
  return {
    A: pool.slice(0, 50),
    B: pool.slice(50, 100),
    C: pool.slice(100, 150),
    D: pool.slice(150, 200),
    E: pool.slice(200, 250),
  };
}
