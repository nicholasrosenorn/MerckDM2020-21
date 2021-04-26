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
        csv_file = open(r'C:\Users\duslg\Desktop\Fall 2020\Merck\export-2020-07-30 - received (1)\export-2020-07-30 - received\{}\{}.heart.csv'.format(real_folder_name, read_from), 'r')
        csv_reader = csv.DictReader(csv_file)
        output_fieldName = csv_reader.fieldnames
        for line in csv_reader:
            value_list.append(float(line['value']))
        csv_file.close()
        plt.plot(value_list)
        value_num = len(value_list)


        fake_data = []
        with open(r'C:\Users\duslg\Desktop\Fall 2020\Merck\export-2020-07-30 - received (1)\export-2020-07-30 - received\{}\{}.heart.csv'.format(real_folder_name, read_from), 'r') as csv_file:
            csv_reader = csv.DictReader(csv_file)
            with open(r'C:\Users\duslg\Desktop\Fall 2020\Merck\export-2020-07-30 - received (1)\export-2020-07-30 - received\{}\{}.heart.csv'.format(folder_name, fake_name), 'w', newline='') as new_file:
                csv_writer = csv.DictWriter(new_file, fieldnames=output_fieldName)
                csv_writer.writeheader()
                index = 0
                for line in csv_reader:
                    # is_high_num = False
                    # for cluster_start_index in high_cluster_start_index:
                    #     if cluster_start_index < index and index < cluster_start_index + each_cluster_number_num:
                    #         line['value'] = round(random.uniform(200, 500), 2)
                    #         is_high_num = True
                    #         break

                    # if is_high_num == False:
                    line['value'] = random.randint(math.floor(value_list[index]) - 10, math.floor(value_list[index]) + 10)
                    csv_writer.writerow(line)
                    fake_data.append(line['value'])
                    index = index + 1

        plt.plot(fake_data)
        plt.legend(['old data set', 'fake data set'])
        plt.title('Heart Dataset')
        plt.ylabel('count/min')
        plt.xlabel('datapoint')
        plt.show()



