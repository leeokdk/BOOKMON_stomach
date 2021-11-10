function statement(invoice, plays){
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `청구내역 (고객명: ${invoice.customer})\n`;
    
    const format = new Intl.NumberFormat("en-US", 
                                         { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format;
    
    for ( let perf of invoice.performances){
        const play = plays[perf.playID];
        let thisAmount = 0;
        
        switch (play.type){
            case "tragedy":
                thisAmount = 40000;
                if(perf.audience > 30){
                    thisAmount += 1000 * (perf.audience - 30);
                }
                break;
            case "comedy":
                thisAmount = 30000;
                if(perf.audience > 20){
                    thisAmount += 10000 + 500 * (perf.audience - 20);
                }
                thisAmount += 300 * perf.audience;
                break;
            default:
                throw new Error(`unknown play type: ${play.type}`);
        }
        // add point
        volumeCredits += Math.max(perf.audience - 30, 0);
        // plus point for comedy customer
        if ("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5);
        
        // totalAmount 
        result += ` ${play.name}: ${format(thisAmount/100)} (${perf.audience}sit\n`;
        totalAmount += thisAmount;
    }
    result += `totalAmount: ${format(totalAmount/100)\n}`;
    result += `additional point: ${volumeCredits}point\n`;
    return result;
}
