//
//  SelsectViedoViewController.m
//  TacgegraphCar
//
//  Created by 刘毅 on 2017/7/25.
//  Copyright © 2017年 vpjacob. All rights reserved.
//

#import "SelsectViedoViewController.h"
#import <QPSDK/QPSDK.h>

@interface SelsectViedoViewController (){
    BOOL _down;
}

@end

@implementation SelsectViedoViewController
    
- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view from its nib.
}
    
- (void)viewDidAppear:(BOOL)animated{
    [super viewDidAppear:animated];
    self.navigationController.navigationBarHidden = NO;
}

- (void)viewDidDisappear:(BOOL)animated{
    [super viewDidDisappear:animated];
    self.navigationController.navigationBarHidden = YES;
}

- (void)qupaiSDK:(id <QupaiSDKDelegate>)sdk compeleteVideoPath:(NSString *)videoPath thumbnailPath:(NSString*)thumbnailPath{
    [self.navigationController popToRootViewControllerAnimated:YES];
    if (videoPath) {
        UISaveVideoAtPathToSavedPhotosAlbum(videoPath, nil, nil, nil);
    }
    if (thumbnailPath) {
        UIImageWriteToSavedPhotosAlbum([UIImage imageWithContentsOfFile:thumbnailPath], nil, nil, nil);
    }
}
    
- (NSArray *)qupaiSDKMusics:(id<QupaiSDKDelegate>)sdk
    {
        NSString *baseDir = [[NSBundle mainBundle] bundlePath];
        NSString *configPath = [[NSBundle mainBundle] pathForResource:_down ? @"music2" : @"music1" ofType:@"json"];
        NSData *configData = [NSData dataWithContentsOfFile:configPath];
        NSDictionary *dic = [NSJSONSerialization JSONObjectWithData:configData options:NSJSONReadingAllowFragments error:nil];
        NSArray *items = dic[@"music"];
        
        NSMutableArray *array = [NSMutableArray array];
        for (NSDictionary *item in items) {
            NSString *path = [baseDir stringByAppendingPathComponent:item[@"resourceUrl"]];
            QPEffectMusic *effect = [[QPEffectMusic alloc] init];
            effect.name = item[@"name"];
            effect.eid = [item[@"id"] intValue];
            effect.musicName = [path stringByAppendingPathComponent:@"audio.mp3"];
            effect.icon = [path stringByAppendingPathComponent:@"icon.png"];
            [array addObject:effect];
        }
        return array;
    }
    
- (IBAction)RecBtnClick:(id)sender {
    QupaiSDK *sdk = [QupaiSDK shared];
    [sdk setDelegte:(id<QupaiSDKDelegate>)self];
    
    /* 基本设置 */
    UIViewController *recordController = [sdk createRecordViewControllerWithMinDuration:2 maxDuration:8 bitRate:2000000];
    
    [self.navigationController pushViewController:recordController animated:YES];
}
    
- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}
    
    /*
     #pragma mark - Navigation
     
     // In a storyboard-based application, you will often want to do a little preparation before navigation
     - (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
     // Get the new view controller using [segue destinationViewController].
     // Pass the selected object to the new view controller.
     }
     */
    
    @end
