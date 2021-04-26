import csv
import statistics
import random
import numpy as np
import math
import matplotlib.pyplot as plt

def Generate_Fake(folder_name, fake_name_list, real_name_list, real_folder_name):
    name_list = real_name_list


    name_index = 0
    for name in name_list:
        read_from = name
        fake_name = fake_name_list[name_index]
        name_index = name_index + 1
        value_list = []
        csv_file = open(r'C:\Users\duslg\Desktop\Fall 2020\Merck\export-2020-07-30 - received (1)\export-2020-07-30 - received\{}\{}.active.csv'.format(real_folder_name, read_from), 'r')
        csv_reader = csv.DictReader(csv_file)
        output_fieldName = csv_reader.fieldnames
        for line in csv_reader:
            value_list.append(float(line['value']))
        csv_file.close()
        plt.plot(value_list)
        mean_value = statistics.mean(value_list)
        print(mean_value)
        larger_number_num = 0
        smaller_number_num = 0
        high_cluster_num = 3
        high_cluster_start_index = []
        for num in value_list:
            if num > mean_value:
                larger_number_num = larger_number_num + 1
            else:
                smaller_number_num = smaller_number_num + 1
        total_number_num = larger_number_num + smaller_number_num
        each_cluster_number_num = math.floor(larger_number_num / 3)
        high_cluster_start_index.append(0)
        high_cluster_start_index.append(random.randint(each_cluster_number_num, total_number_num))
        high_cluster_start_index.append(random.randint(each_cluster_number_num, total_number_num))
        print(larger_number_num)
        print(smaller_number_num)

        fake_data = []
        with open(r'C:\Users\duslg\Desktop\Fall 2020\Merck\export-2020-07-30 - received (1)\export-2020-07-30 - received\{}\{}.active.csv'.format(real_folder_name, read_from), 'r') as csv_file:
            csv_reader = csv.DictReader(csv_file)
            with open(r'C:\Users\duslg\Desktop\Fall 2020\Merck\export-2020-07-30 - received (1)\export-2020-07-30 - received\{}\{}.active.csv'.format(folder_name, fake_name), 'w', newline='') as new_file:
                csv_writer = csv.DictWriter(new_file, fieldnames=output_fieldName)
                csv_writer.writeheader()
                index = 0
                for line in csv_reader:
                    is_high_num = False
                    for cluster_start_index in high_cluster_start_index:
                        if cluster_start_index < index and index < cluster_start_index + each_cluster_number_num:
                            line['value'] = round(random.uniform(1, 3), 2)
                            is_high_num = True
                            break

                    if is_high_num == False:
                        line['value'] = round(random.uniform(0.2, 0.4), 2)
                    csv_writer.writerow(line)
                    fake_data.append(line['value'])
                    index = index + 1

        plt.plot(fake_data)
        plt.legend(['old data set', 'fake data set'])
        plt.title('Active Dataset')
        plt.ylabel('kcal')
        plt.xlabel('datapoint')
        plt.show()



