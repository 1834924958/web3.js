import * as sinonLib from 'sinon';
import TransactionReceiptValidator from '../../src/validators/TransactionReceiptValidator';

/**
 * TransactionReceiptValidator test
 */
describe('TransactionReceiptValidatorTest', () => {
    let transactionReceiptValidator;

    beforeEach(() => {
        transactionReceiptValidator = new TransactionReceiptValidator();
    });

    it('calls validate and returns true', () => {
        expect(
            transactionReceiptValidator.validate(
                {
                    status: true,
                    outOfGas: false,
                    gasUsed: 90
                },
                [
                    {
                        gas: 100
                    }
                ]
            )
        ).to.be.true;
    });

    it('calls validate and returns error because if invalid gasUsage', () => {
        const error = transactionReceiptValidator.validate(
            {
                status: true,
                outOfGas: false,
                gasUsed: 100
            },
            [
                {
                    gas: 100
                }
            ]
        );

        expect(error).to.be.an.instanceof(Error);
        expect(error.message).to.have.string('Transaction ran out of gas. Please provide more gas:');
    });

    it('calls validate and returns error because the EVM has reverted it', () => {
        const error = transactionReceiptValidator.validate(
            {
                status: false,
                outOfGas: false,
                gasUsed: 100
            },
            [
                {
                    gas: 100
                }
            ]
        );

        expect(error).to.be.an.instanceof(Error);
        expect(error.message).to.have.string('Transaction has been reverted by the EVM:');
    });
});