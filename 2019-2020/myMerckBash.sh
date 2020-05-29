#!/bin/bash
if ! type -t ml >& /dev/null; then
        source /etc/profile.d/modules.sh
        echo "sourcing /etc/profile.d"
else
    	echo "ml already defined"
fi
ml anaconda
source activate /home/nrosenor/.conda/envs/cent7/5.3.1-py37/Merck2020/
python /home/nrosenor/Desktop/Merck/python-fitbit-master/BiometricFinal.py
cd /class/datamine/data/corporate/merck/0352t06fm97rcpc58vpjpruo5ahh8803/Biometric_Data
awk 'FNR==1 && NR!=1{next;}{print}' *.csv > bioFinal.csv
cp bioFinal.csv /home/nrosenor/Desktop
