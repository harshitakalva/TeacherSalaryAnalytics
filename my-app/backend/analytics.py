import numpy as np
def run_analytics(data):

    total = data['totalSalary']  
    totalMean = np.mean(total)
    print(totalMean)

    return totalMean

data = {
    'totalSalary' : [100,1222,90,111]
}

print("Hello")
print(run_analytics(data))



