def write_lines(lines, file_index):
    with open(f'{file_index}.txt'.rjust(9, '0'), 'w') as new_file:
        for line in lines:
            new_file.write(f'{line}\n')

def generate():
    current_file = 0
    current_lines = []
    current_line = ''
    with open('b1.txt') as book:
        for line in book:
            if len(current_line) > 150 and '.' in line:
                stop_index = line.index('.') + 1
                if len(line) == stop_index:
                    stop_index -= 1
                if line[stop_index] not in [' ', '\n']:
                    stop_index += 1
                current_line += line[:stop_index]

                if len(current_line) > 250:
                    current_line = line[stop_index:-1] + ' '
                    continue

                current_lines.append(current_line.strip())

                if len(current_lines) >= 100:
                    write_lines(current_lines, current_file)
                    current_file += 1
                    current_lines = []

                current_line = line[stop_index:-1] + ' '
                continue
            current_line += (line[:-1] + ' ')
    write_lines(current_lines, current_file)
        


generate()