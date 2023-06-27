import numpy as np
import pandas as pd
def run_analytics(data):
    total = []
    base = []
    fica = []
    retirement = []
    fte = []
    degree = []
    BASalary = []
    MASalary = []
    fullTime = []
    partTime = []
    feedback = []
    years = []

    for document in data:
        
        total.append(document['total'] )
        base.append(document['base'] )
        fica.append(document['fica'] )
        retirement.append(document['retirement'] )
        fte.append(document['fte'])
        degree.append(document['degree'])
        feedback.append(document['feedback'])
        years.append(document['years'])

        if document['degree'] == 'BA':
            BASalary.append(document['total'])
        else:
            MASalary.append(document['total'])

        if document['fte'] == 1:
            fullTime.append(document['total'])
        else:
            partTime.append(document['total'])
        

        

    # To display total salary mean
    totalMean = np.mean(total)

    # Pie chart of payment distribution
    baseMean = np.mean(base)
    ficaMean = np.mean(fica)
    retirementMean = np.mean(retirement)

    # FTE distribution
    partTimeCount = fte.count(0.5)
    fullTimeCount = fte.count(1)

    # Degree Distribution
    BACount = degree.count('BA')
    MACount = degree.count('MA')

    # BA vs MA Salary 
    BASalaryMean = np.mean(BASalary)
    MASalaryMean = np.mean(MASalary)

    #full time vs part time Salary
    fullTimeSalary = np.mean(fullTime)
    partTimeSalary = np.mean(partTime)

    #feedback count
    satisfiedCount = feedback.count('Satisfied')
    neutralCount = feedback.count('Neutral')
    dissatisfiedCount = feedback.count('Dissatisfied')



    return {
        'totalSalaryMean' : totalMean,
        'baseIncomeMean' : baseMean,
        'ficaPaymentMean' : ficaMean,
        'retirementPaymentMean' : retirementMean,
        'partTimeCount' : partTimeCount,
        'fullTimeCount' : fullTimeCount, 
        'BACount' : BACount,
        'MACount' : MACount,
        'BASalaryMean' : BASalaryMean,
        'MASalaryMean' : MASalaryMean,
        'fullTimeSalary' : fullTimeSalary,
        'partTimeSalary' : partTimeSalary,
        'satisfiedCount' : satisfiedCount,
        'neutralCount' : neutralCount,
        'dissatisfiedCount' : dissatisfiedCount ,
        

    }




