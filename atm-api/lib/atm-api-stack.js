"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ATMStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_apigateway_1 = require("aws-cdk-lib/aws-apigateway");
const aws_lambda_1 = require("aws-cdk-lib/aws-lambda");
class ATMStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        // Lambda para depositar dinero
        const lambdaDepositarDinero = new aws_lambda_1.Function(this, 'LambdaDepositarDinero', {
            runtime: aws_lambda_1.Runtime.NODEJS_20_X,
            handler: 'deposito.handler',
            code: aws_lambda_1.Code.fromAsset('lambda'),
        });
        //Lambda para retirar dinero
        const lambdaRetirarDinero = new aws_lambda_1.Function(this, 'LambdaRetirarDinero', {
            runtime: aws_lambda_1.Runtime.NODEJS_20_X,
            handler: 'retiro.handler',
            code: aws_lambda_1.Code.fromAsset('lambda'),
        });
        // Lambda para cambiar la clave de la tarjeta de debito
        const lambdaCambiarClave = new aws_lambda_1.Function(this, 'LambdaCambiarClave', {
            runtime: aws_lambda_1.Runtime.NODEJS_20_X,
            handler: 'cambiarClave.handler',
            code: aws_lambda_1.Code.fromAsset('lambda'),
        });
        // API Gateway para exponer las funciones
        const api = new aws_apigateway_1.RestApi(this, 'ApiGateway', {
            restApiName: 'ApiGateway-ATM',
        });
        // Crear los recursos
        // /atm/depositar
        // /atm/retirar
        // /atm/cambiarClave
        const resource = api.root.addResource('atm');
        resource.addResource('depositar').addMethod('POST', new aws_apigateway_1.LambdaIntegration(lambdaDepositarDinero));
        resource.addResource('retirar').addMethod('POST', new aws_apigateway_1.LambdaIntegration(lambdaRetirarDinero));
        resource.addResource('cambiarClave').addMethod('POST', new aws_apigateway_1.LambdaIntegration(lambdaCambiarClave));
    }
}
exports.ATMStack = ATMStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXRtLWFwaS1zdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImF0bS1hcGktc3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsNkNBQWdEO0FBQ2hELCtEQUF1RjtBQUN2Rix1REFBaUU7QUFHakUsTUFBYSxRQUFTLFNBQVEsbUJBQUs7SUFDakMsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUFrQjtRQUMxRCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4QiwrQkFBK0I7UUFDL0IsTUFBTSxxQkFBcUIsR0FBRyxJQUFJLHFCQUFRLENBQUMsSUFBSSxFQUFFLHVCQUF1QixFQUFFO1lBQ3hFLE9BQU8sRUFBRSxvQkFBTyxDQUFDLFdBQVc7WUFDNUIsT0FBTyxFQUFFLGtCQUFrQjtZQUMzQixJQUFJLEVBQUUsaUJBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO1NBQy9CLENBQUMsQ0FBQTtRQUVGLDRCQUE0QjtRQUM1QixNQUFNLG1CQUFtQixHQUFHLElBQUkscUJBQVEsQ0FBQyxJQUFJLEVBQUUscUJBQXFCLEVBQUU7WUFDcEUsT0FBTyxFQUFFLG9CQUFPLENBQUMsV0FBVztZQUM1QixPQUFPLEVBQUUsZ0JBQWdCO1lBQ3pCLElBQUksRUFBRSxpQkFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7U0FDL0IsQ0FBQyxDQUFBO1FBRUYsdURBQXVEO1FBQ3ZELE1BQU0sa0JBQWtCLEdBQUcsSUFBSSxxQkFBUSxDQUFDLElBQUksRUFBRSxvQkFBb0IsRUFBRTtZQUNsRSxPQUFPLEVBQUUsb0JBQU8sQ0FBQyxXQUFXO1lBQzVCLE9BQU8sRUFBRSxzQkFBc0I7WUFDL0IsSUFBSSxFQUFFLGlCQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQztTQUMvQixDQUFDLENBQUE7UUFHRix5Q0FBeUM7UUFDekMsTUFBTSxHQUFHLEdBQUcsSUFBSSx3QkFBTyxDQUFDLElBQUksRUFBRSxZQUFZLEVBQUU7WUFDMUMsV0FBVyxFQUFFLGdCQUFnQjtTQUM5QixDQUFDLENBQUE7UUFFRixxQkFBcUI7UUFDckIsaUJBQWlCO1FBQ2pCLGVBQWU7UUFDZixvQkFBb0I7UUFDcEIsTUFBTSxRQUFRLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDNUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLElBQUksa0NBQWlCLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFBO1FBQ2pHLFFBQVEsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxJQUFJLGtDQUFpQixDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQTtRQUM3RixRQUFRLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxrQ0FBaUIsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUE7SUFVbkcsQ0FBQztDQUNGO0FBakRELDRCQWlEQyIsInNvdXJjZXNDb250ZW50IjpbIlxuXG5pbXBvcnQgeyBTdGFjaywgU3RhY2tQcm9wcyB9IGZyb20gXCJhd3MtY2RrLWxpYlwiO1xuaW1wb3J0IHsgTGFtYmRhSW50ZWdyYXRpb24sIExhbWJkYVJlc3RBcGksIFJlc3RBcGkgfSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWFwaWdhdGV3YXlcIjtcbmltcG9ydCB7IEZ1bmN0aW9uLCBDb2RlLCBSdW50aW1lIH0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1sYW1iZGFcIjtcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gXCJjb25zdHJ1Y3RzXCI7XG5cbmV4cG9ydCBjbGFzcyBBVE1TdGFjayBleHRlbmRzIFN0YWNrIHtcbiAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM/OiBTdGFja1Byb3BzKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG5cbiAgICAvLyBMYW1iZGEgcGFyYSBkZXBvc2l0YXIgZGluZXJvXG4gICAgY29uc3QgbGFtYmRhRGVwb3NpdGFyRGluZXJvID0gbmV3IEZ1bmN0aW9uKHRoaXMsICdMYW1iZGFEZXBvc2l0YXJEaW5lcm8nLCB7XG4gICAgICBydW50aW1lOiBSdW50aW1lLk5PREVKU18yMF9YLFxuICAgICAgaGFuZGxlcjogJ2RlcG9zaXRvLmhhbmRsZXInLFxuICAgICAgY29kZTogQ29kZS5mcm9tQXNzZXQoJ2xhbWJkYScpLFxuICAgIH0pXG5cbiAgICAvL0xhbWJkYSBwYXJhIHJldGlyYXIgZGluZXJvXG4gICAgY29uc3QgbGFtYmRhUmV0aXJhckRpbmVybyA9IG5ldyBGdW5jdGlvbih0aGlzLCAnTGFtYmRhUmV0aXJhckRpbmVybycsIHtcbiAgICAgIHJ1bnRpbWU6IFJ1bnRpbWUuTk9ERUpTXzIwX1gsXG4gICAgICBoYW5kbGVyOiAncmV0aXJvLmhhbmRsZXInLFxuICAgICAgY29kZTogQ29kZS5mcm9tQXNzZXQoJ2xhbWJkYScpLFxuICAgIH0pXG5cbiAgICAvLyBMYW1iZGEgcGFyYSBjYW1iaWFyIGxhIGNsYXZlIGRlIGxhIHRhcmpldGEgZGUgZGViaXRvXG4gICAgY29uc3QgbGFtYmRhQ2FtYmlhckNsYXZlID0gbmV3IEZ1bmN0aW9uKHRoaXMsICdMYW1iZGFDYW1iaWFyQ2xhdmUnLCB7XG4gICAgICBydW50aW1lOiBSdW50aW1lLk5PREVKU18yMF9YLFxuICAgICAgaGFuZGxlcjogJ2NhbWJpYXJDbGF2ZS5oYW5kbGVyJyxcbiAgICAgIGNvZGU6IENvZGUuZnJvbUFzc2V0KCdsYW1iZGEnKSxcbiAgICB9KVxuXG5cbiAgICAvLyBBUEkgR2F0ZXdheSBwYXJhIGV4cG9uZXIgbGFzIGZ1bmNpb25lc1xuICAgIGNvbnN0IGFwaSA9IG5ldyBSZXN0QXBpKHRoaXMsICdBcGlHYXRld2F5Jywge1xuICAgICAgcmVzdEFwaU5hbWU6ICdBcGlHYXRld2F5LUFUTScsXG4gICAgfSlcblxuICAgIC8vIENyZWFyIGxvcyByZWN1cnNvc1xuICAgIC8vIC9hdG0vZGVwb3NpdGFyXG4gICAgLy8gL2F0bS9yZXRpcmFyXG4gICAgLy8gL2F0bS9jYW1iaWFyQ2xhdmVcbiAgICBjb25zdCByZXNvdXJjZSA9IGFwaS5yb290LmFkZFJlc291cmNlKCdhdG0nKVxuICAgIHJlc291cmNlLmFkZFJlc291cmNlKCdkZXBvc2l0YXInKS5hZGRNZXRob2QoJ1BPU1QnLCBuZXcgTGFtYmRhSW50ZWdyYXRpb24obGFtYmRhRGVwb3NpdGFyRGluZXJvKSlcbiAgICByZXNvdXJjZS5hZGRSZXNvdXJjZSgncmV0aXJhcicpLmFkZE1ldGhvZCgnUE9TVCcsIG5ldyBMYW1iZGFJbnRlZ3JhdGlvbihsYW1iZGFSZXRpcmFyRGluZXJvKSlcbiAgICByZXNvdXJjZS5hZGRSZXNvdXJjZSgnY2FtYmlhckNsYXZlJykuYWRkTWV0aG9kKCdQT1NUJywgbmV3IExhbWJkYUludGVncmF0aW9uKGxhbWJkYUNhbWJpYXJDbGF2ZSkpXG5cblxuXG5cblxuICAgIFxuXG4gICAgXG5cbiAgfVxufVxuIl19