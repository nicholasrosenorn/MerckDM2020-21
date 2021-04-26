import ActiveFake
import BasalFake
import elev
import heart
import steps
import dist
import os

fake_name_list = []
fake_name_list.append('1593430000000000')
fake_name_list.append('1593432000000000')
fake_name_list.append('1593433000000000')
fake_name_list.append('1593434000000000')
fake_name_list.append('1593435000000000')
fake_name_list.append('1593436000000000')

folder_name_list = []
folder_name_list.extend(['221', '222', '223', '224', '225', '226', '227', '228', '229', '230', '231', '232', '233', '234', '235', '236', '237', '238', '239', '240'])

real_folder_name = '185'
real_name_list = []
real_name_list.extend(['1593482400000000', '1593568800000000', '1593655200000000', '1593741600000000', '1593828000000000', '1593914400000000'])


for folder_name in folder_name_list:
    fake_name_list = []
    fake_name_list.append('159{}0000000000'.format(folder_name))
    fake_name_list.append('159{}2000000000'.format(folder_name))
    fake_name_list.append('159{}3000000000'.format(folder_name))
    fake_name_list.append('159{}4000000000'.format(folder_name))
    fake_name_list.append('159{}5000000000'.format(folder_name))
    fake_name_list.append('159{}6000000000'.format(folder_name))
    path = r'C:\Users\duslg\Desktop\Fall 2020\Merck\export-2020-07-30 - received (1)\export-2020-07-30 - received\{}'.format(folder_name)
    try:
        os.mkdir(path)
    except OSError:
        print ("Creation of the directory %s failed" % path)
    else:
        print ("Successfully created the directory %s " % path)
    ActiveFake.Generate_Fake(folder_name, fake_name_list, real_name_list, real_folder_name)
    BasalFake.Generate_Fake(folder_name, fake_name_list, real_name_list, real_folder_name)
    elev.Generate_Fake(folder_name, fake_name_list, real_name_list, real_folder_name)
    heart.Generate_Fake(folder_name, fake_name_list, real_name_list, real_folder_name)
    steps.Generate_Fake(folder_name, fake_name_list, real_name_list, real_folder_name)
    dist.Generate_Fake(folder_name, fake_name_list, real_name_list, real_folder_name)





