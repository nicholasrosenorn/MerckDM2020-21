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
        outlier_value_list = []
        normal_value_list = []
        csv_file = open(r'C:\Users\duslg\Desktop\Fall 2020\Merck\export-2020-07-30 - received (1)\export-2020-07-30 - received\{}\{}.basal.csv'.format(real_folder_name, read_from), 'r')
        csv_reader = csv.DictReader(csv_file)
        output_fieldName = csv_reader.fieldnames
        outlier_num = 0

        for line in csv_reader:
            value_list.append(float(line['value']))
            if float(line['value']) > 1.0:
                outlier_num = outlier_num + 1
                outlier_value_list.append(float(line['value']))
            else:
                normal_value_list.append(float(line['value']))

        csv_file.close()
        plt.plot(value_list)
        outlier_num_eachgroup = math.floor(outlier_num / 3)

        normal_value_mean = np.mean(normal_value_list)
        outlier_value_mean = np.mean(outlier_value_list)

        total_num_of_data = len(value_list)

        #choose randomly where the third irregularity would appear
        randomly_picked_location = random.randint(math.floor(total_num_of_data / 3), math.floor(2 * total_num_of_data / 3))


        fake_data = []
        with open(r'C:\Users\duslg\Desktop\Fall 2020\Merck\export-2020-07-30 - received (1)\export-2020-07-30 - received\{}\{}.basal.csv'.format(real_folder_name, read_from), 'r') as csv_file:
            csv_reader = csv.DictReader(csv_file)
            with open(r'C:\Users\duslg\Desktop\Fall 2020\Merck\export-2020-07-30 - received (1)\export-2020-07-30 - received\{}\{}.basal.csv'.format(folder_name, fake_name), 'w', newline='') as new_file:
                csv_writer = csv.DictWriter(new_file, fieldnames=output_fieldName)
                csv_writer.writeheader()
                index = 0
                for line in csv_reader:
                    if index < outlier_num_eachgroup:
                        line['value'] = outlier_value_mean + random.randint(0, 10) * 0.1
                    elif index > total_num_of_data - outlier_num_eachgroup:

                        line['value'] = outlier_value_mean + random.randint(0, 10) * 0.1
                    elif index > randomly_picked_location and index < randomly_picked_location + outlier_num_eachgroup:
                        line['value'] = outlier_value_mean + random.randint(0, 10) * 0.1
                    else:
                        line['value'] = normal_value_mean
                    line['value'] = round(line['value'], 2)
                    fake_data.append(round(line['value'], 2))
                    csv_writer.writerow(line)
                    index = index + 1

        plt.plot(fake_data)
        plt.legend(['old data set', 'fake data set'])
        plt.title('Basal Dataset')
        plt.ylabel('kcal')
        plt.xlabel('datapoint')
        plt.show()


