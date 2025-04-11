import { useState, useEffect } from 'react';
import '../../App.css';
import Button from '@mui/material/Button';
import ConfirmBox from './confirmbox';
import axios from 'axios';

import GeneralQuestionFrame from './general_question_frame';
import AchievementQuestionFrame from './achievement_question_frame';
import SubmitDate from './SubmitDate';
import dayjs from 'dayjs';
import Position from './position';
import SubmitName from './name';
import Title from './title';
import Achievement from './achievement';

function Employee() {
    const minwidth = 250;
    const achievement_minwidth = 120;
    const ten_thousand = <p className='question_unit'>Thousand $</p>;
    const door = <p className='question_unit'>Number</p>;
    const deal = <p className='question_unit'>Deal</p>;
    const g = <p className='question_unit'>Gram(s)</p>;

    const [date, setDate] = useState(dayjs());
    const [position, setPosition] = useState('');
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');

    const [time_deposit, setTimeDeposit] = useState(0);  // 定期/结构性存款
    const [live_deposit, setLiveDeposit] = useState(0);  // 活期存款
    const [single_insurance, setSingleInsurance] = useState(0);  // 趸交保险
    const [regular_insurance, setRegularInsurance] = useState(0);  // 期缴保险
    const [financial_product, setFinancialProduct] = useState(0);  // 理财产品
    const [ipofund, setIPOFund] = useState(0);  // 首发基金
    const [fund, setFund] = useState(0);  // 基金定投
    const [ccb_gold, setCcbGold] = useState(0);  // 建行金
    const [gold, setGold] = useState(0);  // 黄金积存客户 -- 农商贷新增
    const [credit_card, setCreditCard] = useState(0);  // 信用卡
    const [special_installment, setSpecialInstallment] = useState(0);  // 专项分期
    const [personal_loan, setPersonalLoan] = useState(0);  // 个人贷款
    const [mobile_bank, setMobileBank] = useState(0);  // 手机银行
    const [subway, setSubway] = useState(0);  // 地铁刷脸
    const [pension, setPension] = useState(0);  // 养老金
    const [save_money, setSaveMoney] = useState(0);  // 惠省钱
    const [ccb_live, setCcbLive] = useState(0);  // 建行生活
    const [dcep, setDCEP] = useState(0);  // 数字人民币 -- 三方绑卡
    const [cnpc, setCNPC] = useState(0);  // 中石油 -- 银行卡开卡
    const [public_loan, setPublicLoan] = useState(0);  // 惠普贷款
    const [company_account, setCompanyAccount] = useState(0);  // 对公账户开户推荐落地

    const [checkbox, setCheckbox] = useState(false);  // checkbox for confirm data exists
    const [alert_div, setAlertDiv] = useState(false);  // alert div for confirm data exists


    const [window_width, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {  // listen to window resize
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {  // get user info
        console.log('employee page');
        axios.get('https://sddproject-hqfxarbpfrf6fxdz.canadacentral-01.azurewebsites.net/user', {
            withCredentials: true
        }).then((response) => {
            console.log('trying to get user info');
            if (response.data.result === "OK") {
                console.log('Successfully got user info');
                setName(response.data.data.username);
                setPosition(response.data.data.position);
                setTitle(response.data.data.title);
            }
        });
        console.log('got user info');
    }, []);

    const handleSubmit = async () => {
        console.log('submit');
        if (!checkbox) {
            var check_data = await axios.post('https://sddproject-hqfxarbpfrf6fxdz.canadacentral-01.azurewebsites.net/data/check', {
                date: date,
                name: name,
                position: position,
                title: title
            }, {
                withCredentials: true
            });
            console.log(check_data)
            if (check_data.data.result === "FOUND") {
                console.log('data already exists');
                alert('The data already exists. If you want to modify the previous data, please check the confirmation box and submit again.');
                if (!checkbox) {
                    setAlertDiv(true);
                }
                return;
            } else if (check_data.data.result === "ERROR") {
                console.log('Data Sanity Check Failed');
                alert('Data Sanity Check Failed:', check_data.data.message);
                return;
            }
        }
        // check if there is any negative value in the data
        if (time_deposit < 0) {
            alert('Time Deposit cannot be negative!');
            return;
        } else if (live_deposit < 0) {
            alert('Live Deposit cannot be negative!');
            return;
        } else if (single_insurance < 0) {
            alert('Single Insurance cannot be negative!');
            return;
        } else if (regular_insurance < 0) {
            alert('Regular Insurance cannot be negative!');
            return;
        } else if (financial_product < 0) {
            alert('Financial Product cannot be negative!');
            return;
        } else if (ipofund < 0) {
            alert('IPO Fund cannot be negative!');
            return;
        } else if (fund < 0) {
            alert('Fund cannot be negative!');
            return;
        } else if (ccb_gold < 0) {
            alert('CCB Gold cannot be negative!');
            return;
        } else if (gold < 0) {
            alert('Gold cannot be negative!');
            return;
        } else if (credit_card < 0) {
            alert('Credit Card cannot be negative!');
            return;
        } else if (special_installment < 0) {
            alert('Special Installment cannot be negative!');
            return;
        } else if (personal_loan < 0) {
            alert('Personal Loan cannot be negative!');
            return;
        } else if (mobile_bank < 0) {
            alert('Mobile Bank cannot be negative!');
            return;
        } else if (subway < 0) {
            alert('Subway cannot be negative!');
            return;
        } else if (pension < 0) {
            alert('Pension cannot be negative!');
            return;
        } else if (save_money < 0) {
            alert('Save Money cannot be negative!');
            return;
        } else if (ccb_live < 0) {
            alert('CCB Live cannot be negative!');
            return;
        } else if (dcep < 0) {
            alert('DCEP cannot be negative!');
            return;
        } else if (cnpc < 0) {
            alert('CNPC cannot be negative!');
            return;
        } else if (public_loan < 0) {
            alert('Public Loan cannot be negative!');
            return;
        } else if (company_account < 0) {
            alert('Company Account cannot be negative!');
            return;
        }
        axios.post('https://sdd-test-project-cma8b0b7ayc4duhx.canadacentral-01.azurewebsites.net//data', {
            date: date,
            name: name,
            position: position,
            title: title,
            time_deposit: time_deposit,
            live_deposit: live_deposit,
            single_insurance: single_insurance,
            regular_insurance: regular_insurance,
            financial_product: financial_product,
            ipofund: ipofund,
            fund: fund,
            ccb_gold: ccb_gold,
            gold: gold,
            credit_card: credit_card,
            special_installment: special_installment,
            personal_loan: personal_loan,
            mobile_bank: mobile_bank,
            subway: subway,
            pension: pension,
            save_money: save_money,
            ccb_live: ccb_live,
            dcep: dcep,
            cnpc: cnpc,
            public_loan: public_loan,
            company_account: company_account
        }, {
            withCredentials: true
        }).then((response) => {
            if (response.data.result === "OK") {
                alert('Submit Successful');
            } else {
                alert(response.data.message);
            }
        });
    };

    return (
        <main className='d-flex flex_center'>
            <section className='w_25' style={{display: window_width > 800 ? 'block' : 'none'}}></section>
            <section className={window_width > 800 ? 'w-50' : 'w-100'}>
                <h1 className='title mt-5'>Daily Status</h1>
                <br></br>
                <h2 className='text-start ml_1'>General Information</h2>
                <hr></hr>
                <GeneralQuestionFrame question='Date: ' input={<SubmitDate date={date} onDateChange={setDate} minwidth={minwidth}/>}/>
                <GeneralQuestionFrame question='Name: ' input={<SubmitName name={name} onSubmit={setName} minwidth={minwidth}/>}/>
                <GeneralQuestionFrame question='Branch: ' input={<Position position={position} onPositionChange={setPosition} minwidth={minwidth}/>}/>
                <GeneralQuestionFrame question='Title: ' input={<Title title={title} onTitleChange={setTitle} minwidth={minwidth} isregister={false}/>}/>
                <h2 className='text-start ml_1'>Achievement Information</h2>
                <hr></hr>
                <AchievementQuestionFrame question='Time Deposit: ' unit={ten_thousand} input={<Achievement data={time_deposit} onDataChange={setTimeDeposit} minwidth={achievement_minwidth}/>}/>
                <AchievementQuestionFrame question='Live Deposit: ' unit={ten_thousand} input={<Achievement data={live_deposit} onDataChange={setLiveDeposit} minwidth={achievement_minwidth}/>}/>
                <AchievementQuestionFrame question='Single Insurance: ' unit={door} input={<Achievement data={single_insurance} onDataChange={setSingleInsurance} minwidth={achievement_minwidth}/>}/>
                <AchievementQuestionFrame question='Regular Insurance: ' unit={door} input={<Achievement data={regular_insurance} onDataChange={setRegularInsurance} minwidth={achievement_minwidth}/>}/>                
                <AchievementQuestionFrame question='Finantial Product: ' unit={ten_thousand} input={<Achievement data={financial_product} onDataChange={setFinancialProduct} minwidth={achievement_minwidth}/>}/>
                <AchievementQuestionFrame question='IPO Funding: ' unit={ten_thousand} input={<Achievement data={ipofund} onDataChange={setIPOFund} minwidth={achievement_minwidth}/>}/>
                <AchievementQuestionFrame question='Regular Funding: ' unit={deal} input={<Achievement data={fund} onDataChange={setFund} minwidth={achievement_minwidth}/>}/>
                <AchievementQuestionFrame question='CCB Gold: ' unit={g} input={<Achievement data={ccb_gold} onDataChange={setCcbGold} minwidth={achievement_minwidth}/>}/>
                <AchievementQuestionFrame question='Gold: ' unit={door} input={<Achievement data={gold} onDataChange={setGold} minwidth={achievement_minwidth}/>}/>
                <AchievementQuestionFrame question='Credit Card: ' unit={door} input={<Achievement data={credit_card} onDataChange={setCreditCard} minwidth={achievement_minwidth}/>}/>
                <AchievementQuestionFrame question='Special Installment: ' unit={ten_thousand} input={<Achievement data={special_installment} onDataChange={setSpecialInstallment} minwidth={achievement_minwidth}/>}/>
                <AchievementQuestionFrame question='Personal Loan: ' unit={ten_thousand} input={<Achievement data={personal_loan} onDataChange={setPersonalLoan} minwidth={achievement_minwidth}/>}/>
                <AchievementQuestionFrame question='Mobile Bank Account: ' unit={door} input={<Achievement data={mobile_bank} onDataChange={setMobileBank} minwidth={achievement_minwidth}/>}/>
                <AchievementQuestionFrame question='Subway Account: ' unit={door} input={<Achievement data={subway} onDataChange={setSubway} minwidth={achievement_minwidth}/>}/>
                <AchievementQuestionFrame question='Pension: ' unit={door} input={<Achievement data={pension} onDataChange={setPension} minwidth={achievement_minwidth}/>}/>
                <AchievementQuestionFrame question='Save Money: ' unit={door} input={<Achievement data={save_money} onDataChange={setSaveMoney} minwidth={achievement_minwidth}/>}/>
                <AchievementQuestionFrame question='CCB Live: ' unit={door} input={<Achievement data={ccb_live} onDataChange={setCcbLive} minwidth={achievement_minwidth}/>}/>
                <AchievementQuestionFrame question='DCEP: ' unit={door} input={<Achievement data={dcep} onDataChange={setDCEP} minwidth={achievement_minwidth}/>}/>
                <AchievementQuestionFrame question='CNPC: ' unit={door} input={<Achievement data={cnpc} onDataChange={setCNPC} minwidth={achievement_minwidth}/>}/>
                <AchievementQuestionFrame question='Public Loan' unit={door} input={<Achievement data={public_loan} onDataChange={setPublicLoan} minwidth={achievement_minwidth}/>}/>
                <AchievementQuestionFrame question='Company Account' unit={door} input={<Achievement data={company_account} onDataChange={setCompanyAccount} minwidth={achievement_minwidth}/>}/>
                {!alert_div ? <></> : <ConfirmBox checkbox={checkbox} onCheckboxChange={setCheckbox}/>}
                <Button variant="contained" sx={{minWidth: 200}} onClick={handleSubmit}>Submit</Button>
                <hr></hr>
            </section>
            <section className='w_25' style={{display: window_width > 800 ? 'block' : 'none'}}></section>
        </main>
    );
}

export default Employee;